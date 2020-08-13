package com.tutorial.backend;

import com.tutorial.backend.entity.Board;
import com.tutorial.backend.entity.GameState;

import org.springframework.stereotype.Service;

@Service
public class GameService {
    public void makeMove(Board board) {
        var x = board;
    }

    public GameState currentGameState() {
        return new GameState();
    }
}