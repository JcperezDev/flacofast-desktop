use std::fs;
use std::path::PathBuf;

use crate::utils::errors::{AppError, AppResult};

pub fn app_data_dir() -> AppResult<PathBuf> {
    let dir = dirs::data_local_dir()
        .ok_or_else(|| AppError::Validation("Unable to resolve a local data directory".into()))?
        .join("FlacoFast");

    fs::create_dir_all(&dir)?;
    Ok(dir)
}

pub fn config_path() -> AppResult<PathBuf> {
    Ok(app_data_dir()?.join("config.json"))
}

pub fn history_path() -> AppResult<PathBuf> {
    Ok(app_data_dir()?.join("history.json"))
}

pub fn wireguard_config_path(interface_name: &str) -> AppResult<PathBuf> {
    Ok(app_data_dir()?.join(format!("{interface_name}.conf")))
}
