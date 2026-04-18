use crate::models::node::{Node, NodeStatus};
use crate::services::network_probe;
use crate::utils::errors::AppResult;

#[tauri::command]
pub fn run_healthcheck(mut node: Node) -> AppResult<Node> {
    node.status = if network_probe::host_reachable(&node.host) {
        NodeStatus::Online
    } else {
        NodeStatus::Offline
    };

    Ok(node)
}
