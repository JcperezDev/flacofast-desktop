use serde::{Deserialize, Serialize};

use super::metrics::Metrics;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Node {
    pub id: String,
    pub name: String,
    pub host: String,
    pub port: u16,
    pub region: String,
    pub is_primary: bool,
    pub status: NodeStatus,
    pub metrics: Option<Metrics>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum NodeStatus {
    Online,
    Offline,
    Unknown,
}
