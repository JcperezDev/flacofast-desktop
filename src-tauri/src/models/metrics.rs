use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Metrics {
    pub ping_ms: f64,
    pub jitter_ms: f64,
    pub packet_loss_pct: f64,
    pub tested_at: String,
}
