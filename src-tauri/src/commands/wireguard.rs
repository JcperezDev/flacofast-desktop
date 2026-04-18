use tauri::State;

use crate::models::config::AppConfig;
use crate::models::node::Node;
use crate::models::tunnel::TunnelState;
use crate::services::wireguard;
use crate::state::AppState;
use crate::utils::errors::AppResult;

#[tauri::command]
pub fn connect_tunnel(state: State<'_, AppState>, config: AppConfig, node: Node) -> AppResult<TunnelState> {
    let tunnel = wireguard::connect(&config, &node)?;
    *state.tunnel.lock().expect("tunnel state poisoned") = tunnel.clone();
    Ok(tunnel)
}

#[tauri::command]
pub fn disconnect_tunnel(state: State<'_, AppState>, interface_name: String) -> AppResult<TunnelState> {
    let tunnel = wireguard::disconnect(&interface_name)?;
    *state.tunnel.lock().expect("tunnel state poisoned") = tunnel.clone();
    Ok(tunnel)
}

#[tauri::command]
pub fn get_tunnel_status(state: State<'_, AppState>, interface_name: String) -> AppResult<TunnelState> {
    let tunnel = wireguard::status(&interface_name)?;
    *state.tunnel.lock().expect("tunnel state poisoned") = tunnel.clone();
    Ok(tunnel)
}
