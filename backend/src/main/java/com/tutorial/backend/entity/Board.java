package com.tutorial.backend.entity;

import lombok.Data;

@Data
public class Board {
    private String[] squares;

    public Board() {
        this.squares = new String[]{"", "", "", "", "", "", "", "", ""};
    }
}