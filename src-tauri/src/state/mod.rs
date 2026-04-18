use std::sync::Mutex;

use crate::models::tunnel::TunnelState;

pub struct AppState {
    pub tunnel: Mutex<TunnelState>,
}

impl AppState {
    pub fn new() -> Self {
        Self {
            tunnel: Mutex::new(TunnelState::default()),
        }
    }
}
