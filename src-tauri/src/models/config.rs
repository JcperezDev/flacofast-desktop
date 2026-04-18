use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AppConfig {
    pub vps_host: String,
    pub wire_guard_port: u16,
    pub server_public_key: String,
    pub dns: String,
    pub node_name: String,
    pub region: String,
    pub auto_connect: bool,
    pub interface_name: String,
    pub client_address: String,
    pub allowed_ips: String,
}

impl Default for AppConfig {
    fn default() -> Self {
        Self {
            vps_host: "203.0.113.10".into(),
            wire_guard_port: 51820,
            server_public_key: String::new(),
            dns: "1.1.1.1".into(),
            node_name: "Main VPS".into(),
            region: "US East".into(),
            auto_connect: false,
            interface_name: "flacofast0".into(),
            client_address: "10.8.0.2/32".into(),
            allowed_ips: "0.0.0.0/0, ::/0".into(),
        }
    }
}
