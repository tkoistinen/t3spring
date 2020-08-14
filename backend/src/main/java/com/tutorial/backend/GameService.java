package com.tutorial.backend;

import com.tutorial.backend.entity.Board;
import com.tutorial.backend.entity.GameState;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GameService {
    @Autowired
    private GameRepository gameRepository;

    public void makeMove(Board board) {
        var previousState = gameRepository.findTopByOrderByIdDesc();
        var nextPlayer = previousState.getNextPlayer().equals("X") ? "O" : "X";
        var winner = "";
        var moveNumber = previousState.getMoveNumber() + 1;
        var newMove = new GameState(nextPlayer, winner, board, moveNumber);

        gameRepository.save(newMove);
    }

    public GameState currentGameState() {
        return new GameState();
    }
}