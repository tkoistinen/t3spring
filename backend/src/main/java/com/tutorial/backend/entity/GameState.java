package com.tutorial.backend.entity;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.With;

@Data
@Entity
@AllArgsConstructor
@With
@Table(name = "game_moves")
public class GameState {
    @Id
    @GeneratedValue
    private long id;

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

    public GameState(String nextPlayer, String winner, Board board, int moveNumber) {
        this.nextPlayer = nextPlayer;
        this.winner = winner;
        this.board = board;
        this.moveNumber = moveNumber;
    }
}