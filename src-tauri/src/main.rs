#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod models;
mod services;
mod state;
mod utils;

use state::AppState;

fn main() {
    tauri::Builder::default()
        .manage(AppState::new())
        .invoke_handler(tauri::generate_handler![
            commands::ping::run_latency_test,
            commands::jitter::run_jitter_test,
            commands::packet_loss::run_packet_loss_test,
            commands::wireguard::connect_tunnel,
            commands::wireguard::disconnect_tunnel,
            commands::wireguard::get_tunnel_status,
            commands::config::save_config,
            commands::config::load_config,
            commands::config::save_history,
            commands::config::load_history,
            commands::health::run_healthcheck,
        ])
        .run(tauri::generate_context!())
        .expect("failed to run FlacoFast");
}
