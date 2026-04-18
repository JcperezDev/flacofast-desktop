use serde::{Deserialize, Serialize};

use super::metrics::Metrics;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct HistoryEntry {
    pub id: String,
    pub tested_at: String,
    pub game_id: String,
    pub game_name: String,
    pub node_id: String,
    pub node_name: String,
    pub before: Option<Metrics>,
    pub after: Metrics,
    pub result: String,
}
