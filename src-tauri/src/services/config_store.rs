use std::fs;

use crate::models::config::AppConfig;
use crate::models::history::HistoryEntry;
use crate::utils::errors::AppResult;
use crate::utils::paths::{config_path, history_path};

pub fn load_config() -> AppResult<AppConfig> {
    let path = config_path()?;
    if !path.exists() {
        return Ok(AppConfig::default());
    }

    let content = fs::read_to_string(path)?;
    Ok(serde_json::from_str(&content)?)
}

pub fn save_config(config: &AppConfig) -> AppResult<AppConfig> {
    fs::write(config_path()?, serde_json::to_string_pretty(config)?)?;
    Ok(config.clone())
}

pub fn load_history() -> AppResult<Vec<HistoryEntry>> {
    let path = history_path()?;
    if !path.exists() {
        return Ok(Vec::new());
    }

    let content = fs::read_to_string(path)?;
    Ok(serde_json::from_str(&content)?)
}

pub fn save_history(entries: &[HistoryEntry]) -> AppResult<Vec<HistoryEntry>> {
    fs::write(history_path()?, serde_json::to_string_pretty(entries)?)?;
    Ok(entries.to_vec())
}
