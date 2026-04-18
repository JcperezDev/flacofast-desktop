use std::process::Command;

use crate::utils::errors::{AppError, AppResult};

pub fn run_command(program: &str, args: &[&str]) -> AppResult<String> {
    let output = Command::new(program).args(args).output()?;

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr).trim().to_string();
        let stdout = String::from_utf8_lossy(&output.stdout).trim().to_string();
        let detail = if stderr.is_empty() { stdout } else { stderr };
        return Err(AppError::Command(detail));
    }

    Ok(String::from_utf8_lossy(&output.stdout).to_string())
}
