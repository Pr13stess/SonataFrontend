const API_URL = "http://localhost:5180/api";

// =========================
// SONGS
// =========================

export async function getSongs(search = "") {
  const url = search
    ? `${API_URL}/songs?search=${encodeURIComponent(search)}`
    : `${API_URL}/songs`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch songs");
  }

  return response.json();
}


// =========================
// PLAYER
// =========================

export async function playSong(songId) {
  const response = await fetch(
    `${API_URL}/player/play/${songId}`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to play song");
  }

  return response.json();
}


export async function pauseSong() {
  const response = await fetch(
    `${API_URL}/player/pause`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to pause song");
  }

  return response.json();
}


export async function resumeSong() {
  const response = await fetch(
    `${API_URL}/player/resume`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to resume song");
  }

  return response.json();
}


export async function stopSong() {
  const response = await fetch(
    `${API_URL}/player/stop`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to stop song");
  }

  return response.json();
}


export async function shuffleSongs(enabled) {
  const response = await fetch(
    `${API_URL}/player/shuffle`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        enabled,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to toggle shuffle");
  }

  return response.json();
}


export async function getPlayerState() {
  const response = await fetch(
    `${API_URL}/player/state`
  );

  if (!response.ok) {
    throw new Error("Failed to get player state");
  }

  return response.json();
}