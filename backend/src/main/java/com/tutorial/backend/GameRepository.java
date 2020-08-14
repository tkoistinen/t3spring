package com.tutorial.backend;

import com.tutorial.backend.entity.GameState;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.repository.CrudRepository;

public interface GameRepository extends JpaRepository<GameState, Long> {
    GameState findTopByOrderByIdDesc();
}