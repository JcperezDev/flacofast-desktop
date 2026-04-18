use crate::services::network_probe;
use crate::utils::errors::AppResult;

#[tauri::command]
pub fn run_packet_loss_test(host: String, count: Option<u8>) -> AppResult<f64> {
    network_probe::run_packet_loss_probe(&host, count.unwrap_or(5))
}
