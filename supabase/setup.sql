-- Povolení UUID rozšíření (pokud ještě není)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ERAS: Období a žánry (20 let evoluce)
CREATE TABLE eras (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    year_start INT NOT NULL,
    year_end INT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ALBUMS: Releasy pod danou érou
CREATE TABLE albums (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    era_id UUID NOT NULL REFERENCES eras(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    cover_url TEXT,
    release_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TRACKS: Samotné věci
CREATE TABLE tracks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    album_id UUID NOT NULL REFERENCES albums(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    audio_url TEXT NOT NULL,
    duration INT, -- V sekundách
    track_number INT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- LYRICS: Jednotlivé řádky textu (pro přesný mapping anotací)
CREATE TABLE lyrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    track_id UUID NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
    line_number INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ANNOTATIONS: Vysvětlivky k textům (Genius style)
CREATE TABLE annotations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lyric_id UUID NOT NULL REFERENCES lyrics(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- MANIFESTO: Rant & Stream vědomí
CREATE TABLE manifesto_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    reading_time INT, -- Odhadovaná doba čtení v minutách
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- HATE MAIL: Archív toxického odpadu
CREATE TABLE hate_mail (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_name TEXT,
    email TEXT,
    message TEXT NOT NULL,
    is_approved BOOLEAN NOT NULL DEFAULT FALSE, -- Schválně odděleno, na frontendu renderujeme jen ty "Approved" pro Zeď slávy
    artist_response TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- VÝKONNOSTNÍ INDEXY (Základ pro bleskové dotazy v B-Tree)
CREATE INDEX idx_albums_era_id ON albums(era_id);
CREATE INDEX idx_albums_slug ON albums(slug);

CREATE INDEX idx_tracks_album_id ON tracks(album_id);
CREATE INDEX idx_tracks_slug ON tracks(slug);

CREATE INDEX idx_lyrics_track_id ON lyrics(track_id);
CREATE INDEX idx_annotations_lyric_id ON annotations(lyric_id);

CREATE INDEX idx_manifesto_slug ON manifesto_posts(slug);
CREATE INDEX idx_manifesto_created_at ON manifesto_posts(created_at DESC);

CREATE INDEX idx_hatemail_created_at ON hate_mail(created_at DESC);
CREATE INDEX idx_hatemail_approved ON hate_mail(is_approved) WHERE is_approved = TRUE;
