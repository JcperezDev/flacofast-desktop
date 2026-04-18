use chrono::Utc;

use crate::models::metrics::Metrics;
use crate::utils::errors::{AppError, AppResult};
use crate::utils::process::run_command;

#[derive(Debug, Clone)]
struct PingSample {
    latency_ms: f64,
}

pub fn run_latency_probe(host: &str, count: u8) -> AppResult<Metrics> {
    let samples = ping_samples(host, count)?;
    let received = samples.len();
    let requested = usize::from(count.max(1));
    let packet_loss_pct = ((requested.saturating_sub(received)) as f64 / requested as f64) * 100.0;
    let ping_ms = average(&samples);
    let jitter_ms = jitter(&samples);

    Ok(Metrics {
        ping_ms,
        jitter_ms,
        packet_loss_pct,
        tested_at: Utc::now().to_rfc3339(),
    })
}

pub fn run_jitter_probe(host: &str, count: u8) -> AppResult<f64> {
    Ok(run_latency_probe(host, count)?.jitter_ms)
}

pub fn run_packet_loss_probe(host: &str, count: u8) -> AppResult<f64> {
    Ok(run_latency_probe(host, count)?.packet_loss_pct)
}

pub fn host_reachable(host: &str) -> bool {
    run_latency_probe(host, 1).is_ok()
}

fn ping_samples(host: &str, count: u8) -> AppResult<Vec<PingSample>> {
    let safe_count = count.clamp(1, 10).to_string();
    let output = if cfg!(target_os = "windows") {
        run_command("ping", &["-n", &safe_count, host])?
    } else {
        run_command("ping", &["-c", &safe_count, "-W", "2", host])?
    };

    let samples = parse_ping_output(&output);
    if samples.is_empty() {
        return Err(AppError::Command("Ping produced no latency samples".into()));
    }

    Ok(samples)
}

fn parse_ping_output(output: &str) -> Vec<PingSample> {
    output
        .lines()
        .filter_map(|line| {
            let marker = if line.contains("time=") {
                "time="
            } else if line.contains("time<") {
                "time<"
            } else {
                return None;
            };

            let (_, raw_value) = line.split_once(marker)?;
            let numeric = raw_value
                .chars()
                .take_while(|char| char.is_ascii_digit() || *char == '.')
                .collect::<String>();
            let latency_ms = numeric.parse::<f64>().ok()?;
            Some(PingSample { latency_ms })
        })
        .collect()
}

fn average(samples: &[PingSample]) -> f64 {
    samples.iter().map(|sample| sample.latency_ms).sum::<f64>() / samples.len() as f64
}

fn jitter(samples: &[PingSample]) -> f64 {
    if samples.len() < 2 {
        return 0.0;
    }

    let deltas = samples
        .windows(2)
        .map(|pair| (pair[1].latency_ms - pair[0].latency_ms).abs())
        .collect::<Vec<_>>();

    deltas.iter().sum::<f64>() / deltas.len() as f64
}
