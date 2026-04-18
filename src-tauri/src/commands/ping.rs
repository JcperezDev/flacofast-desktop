use crate::models::metrics::Metrics;
use crate::services::network_probe;
use crate::utils::errors::AppResult;

#[tauri::command]
pub fn run_latency_test(host: String, count: Option<u8>) -> AppResult<Metrics> {
    network_probe::run_latency_probe(&host, count.unwrap_or(5))
}
