package com.tutorial.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GameService {
    @Autowired
    private GameRepository gameRepository;

    public void makeMove(String[] board) {
        var previousState = gameRepository.findTopByOrderByIdDesc();
        String nextPlayer;
        Integer moveNumber;
        var winner = calculateWinner(board);

        if (previousState != null) {
            nextPlayer = previousState.getNextPlayer().equals("X") ? "O" : "X";
            moveNumber = previousState.getMoveNumber() + 1;
        } else {
            nextPlayer = "O";
            moveNumber = 1;
        }

        var newMove = new GameState(nextPlayer, winner, board, moveNumber);

        gameRepository.save(newMove);
    }

    public GameState currentGameState() {
        var mostRecentMove = gameRepository.findTopByOrderByIdDesc();
        if (mostRecentMove == null) {
            return new GameState();
        } else {
            return mostRecentMove;
        }
    }

    public void clearDB() {
        gameRepository.deleteAll();
    }

    private String calculateWinner(String[] board) {
        int[][] winningStates = { { 0, 3, 6 }, { 1, 4, 7 }, { 2, 5, 8 }, { 0, 1, 2 }, { 3, 4, 5 }, { 6, 7, 8 },
                { 0, 4, 8 }, { 2, 4, 6 }, };
        var winner = "";

        for (int[] line : winningStates) {
            if (!board[line[0]].equals("") && board[line[0]].equals(board[line[1]]) && board[line[1]].equals(board[line[2]])) {
                winner = board[line[0]];
            }
        }

        return winner;
    }
}
