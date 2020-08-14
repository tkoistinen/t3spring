package com.tutorial.backend;

import com.tutorial.backend.entity.Board;
import com.tutorial.backend.entity.GameState;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class GameController {
    @Autowired
    private GameService gameService;

    @GetMapping(value="/")
    public String root() {
        return "Hi";
    }

    @GetMapping(value="/game1")
    public GameState getGameState() {
        return gameService.currentGameState();
    }

    @PutMapping(value="/game1")
    public void makeMove(@RequestBody Board board) {
        gameService.makeMove(board);
    }
    
}