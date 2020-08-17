package com.tutorial.backend;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<GameState, Long> {
    GameState findTopByOrderByIdDesc();
}
