package com.tutorial.backend;

import java.util.UUID;

import com.tutorial.backend.entity.GameState;

import org.springframework.data.repository.CrudRepository;

public interface GameRepository extends CrudRepository<GameState, UUID> {
    GameState findLast();
}