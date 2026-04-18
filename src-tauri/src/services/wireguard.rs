use chrono::Utc;
use std::fs;

use crate::models::config::AppConfig;
use crate::models::node::Node;
use crate::models::tunnel::TunnelState;
use crate::utils::errors::AppResult;
use crate::utils::paths::wireguard_config_path;
use crate::utils::process::run_command;

pub fn connect(config: &AppConfig, node: &Node) -> AppResult<TunnelState> {
    let config_path = write_client_config(config, node)?;

    if cfg!(target_os = "windows") {
        let config_path = config_path.to_string_lossy().to_string();
        run_command("wireguard.exe", &["/installtunnelservice", &config_path])?;
    } else {
        let config_path = config_path.to_string_lossy().to_string();
        run_command("wg-quick", &["up", &config_path])?;
    }

    Ok(TunnelState {
        connected: true,
        node_id: Some(node.id.clone()),
        interface_name: Some(config.interface_name.clone()),
        last_handshake: Some(Utc::now().to_rfc3339()),
    })
}

pub fn disconnect(interface_name: &str) -> AppResult<TunnelState> {
    if cfg!(target_os = "windows") {
        run_command("wireguard.exe", &["/uninstalltunnelservice", interface_name])?;
    } else {
        run_command("wg-quick", &["down", interface_name])?;
    }

    Ok(TunnelState {
        connected: false,
        node_id: None,
        interface_name: Some(interface_name.to_string()),
        last_handshake: None,
    })
}

pub fn status(interface_name: &str) -> AppResult<TunnelState> {
    let output = run_command("wg", &["show", interface_name]).unwrap_or_default();
    let connected = output.contains("latest handshake");
    let last_handshake = output
        .lines()
        .find_map(|line| line.trim().strip_prefix("latest handshake: "))
        .map(ToOwned::to_owned);

    Ok(TunnelState {
        connected,
        node_id: None,
        interface_name: Some(interface_name.to_string()),
        last_handshake,
    })
}

fn write_client_config(config: &AppConfig, node: &Node) -> AppResult<std::path::PathBuf> {
    let path = wireguard_config_path(&config.interface_name)?;
    let content = format!(
        "[Interface]\nAddress = {}\nDNS = {}\n\n[Peer]\nPublicKey = {}\nEndpoint = {}:{}\nAllowedIPs = {}\nPersistentKeepalive = 25\n",
        config.client_address,
        config.dns,
        config.server_public_key,
        node.host,
        node.port,
        config.allowed_ips,
    );

    fs::write(&path, content)?;
    Ok(path)
}
