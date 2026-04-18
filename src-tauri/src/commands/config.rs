use crate::models::config::AppConfig;
use crate::models::history::HistoryEntry;
use crate::services::config_store;
use crate::utils::errors::AppResult;

#[tauri::command]
pub fn save_config(config: AppConfig) -> AppResult<AppConfig> {
    config_store::save_config(&config)
}

#[tauri::command]
pub fn load_config() -> AppResult<AppConfig> {
    config_store::load_config()
}

#[tauri::command]
pub fn save_history(entries: Vec<HistoryEntry>) -> AppResult<Vec<HistoryEntry>> {
    config_store::save_history(&entries)
}

#[tauri::command]
pub fn load_history() -> AppResult<Vec<HistoryEntry>> {
    config_store::load_history()
}
