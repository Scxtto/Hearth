-- exercises (library)
CREATE TABLE exercises (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    type            VARCHAR(64),        -- NEW: machine/bar/cable/etc
    category        VARCHAR(64),
    body_part       VARCHAR(64),
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- workouts (sessions)
CREATE TABLE workouts (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name            VARCHAR(255) NOT NULL,
    template_id     INTEGER REFERENCES workout_templates(id) ON DELETE SET NULL,
    started_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    finished_at     TIMESTAMP WITH TIME ZONE,
    status          VARCHAR(32) NOT NULL DEFAULT 'in_progress', -- 'completed', 'cancelled'
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- workout_exercises (performed in a session)
CREATE TABLE workout_exercises (
    id                  SERIAL PRIMARY KEY,
    workout_id          INTEGER NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
    exercise_id         INTEGER NOT NULL REFERENCES exercises(id),
    "order"             INTEGER NOT NULL,
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- exercise_sets (sets performed in a session)
CREATE TABLE exercise_sets (
    id                  SERIAL PRIMARY KEY,
    workout_exercise_id INTEGER NOT NULL REFERENCES workout_exercises(id) ON DELETE CASCADE,
    set_number          INTEGER NOT NULL,
    weight_kg           NUMERIC(6,2),
    reps                INTEGER NOT NULL,
    completed           BOOLEAN DEFAULT FALSE,
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    -- , notes TEXT           -- Optional: For RPE/notes
);
