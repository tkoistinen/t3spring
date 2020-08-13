package com.tutorial.backend.entity;

import lombok.Data;

@Data
public class GameState {
    private String nextPlayer;
    private String winner;
    private Board board;
    private int moveNumber;

    public GameState() {
        this.nextPlayer = "X";
        this.winner = "";
        this.board = new Board();
        this.moveNumber = 0;
    }

    public void move() {

    }
}