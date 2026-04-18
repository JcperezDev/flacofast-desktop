use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct TunnelState {
    pub connected: bool,
    pub node_id: Option<String>,
    pub interface_name: Option<String>,
    pub last_handshake: Option<String>,
}
