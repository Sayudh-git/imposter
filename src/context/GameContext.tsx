"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { getRandomWord } from "@/lib/gameData";

type Player = {
    id: string;
    name: string;
    isActive: boolean; // Can be toggled on/off
    isPermanent: boolean; // Default 7 are permanent
};

type GameState = {
    phase: "lobby" | "role-assignment" | "playing" | "round-end" | "game-over";
    players: Player[];
    currentPlayerIndex: number;
    imposterIndex: number | null;
    currentWord: string | null;
    currentCategory: string | null;
    hintsRevealed: number;
    currentRound: number;
    maxRounds: number;
};

const DEFAULT_PLAYERS: Player[] = [
    { id: "1", name: "Atindria", isActive: true, isPermanent: true },
    { id: "2", name: "Sthiti", isActive: true, isPermanent: true },
    { id: "3", name: "Sayudh", isActive: true, isPermanent: true },
    { id: "4", name: "Goirik", isActive: true, isPermanent: true },
    { id: "5", name: "Ayushi", isActive: true, isPermanent: true },
    { id: "6", name: "Subhamoy", isActive: true, isPermanent: true },
    { id: "7", name: "Adish", isActive: true, isPermanent: true },
];

interface GameContextType extends GameState {
    togglePlayerActive: (id: string) => void;
    addPlayer: (name: string) => void;
    removePlayer: (id: string) => void;
    resetPlayers: () => void;
    startGame: () => void;
    nextPlayer: () => void;
    revealHint: () => void;
    endGame: () => void;
    nextRound: () => void;
    endRound: () => void;
    resetGame: () => void;
    setGamePhase: (phase: GameState["phase"]) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [gameState, setGameState] = useState<GameState>({
        phase: "lobby",
        players: DEFAULT_PLAYERS,
        currentPlayerIndex: 0,
        imposterIndex: null,
        currentWord: null,
        currentCategory: null,
        hintsRevealed: 0,
        currentRound: 1,
        maxRounds: 3,
    });

    const togglePlayerActive = (id: string) => {
        setGameState((prev) => ({
            ...prev,
            players: prev.players.map((p) =>
                p.id === id ? { ...p, isActive: !p.isActive } : p
            ),
        }));
    };

    const addPlayer = (name: string) => {
        const newPlayer: Player = {
            id: crypto.randomUUID(),
            name,
            isActive: true,
            isPermanent: false,
        };
        setGameState((prev) => ({
            ...prev,
            players: [...prev.players, newPlayer],
        }));
    };

    const removePlayer = (id: string) => {
        setGameState((prev) => ({
            ...prev,
            players: prev.players.filter((p) => p.id !== id),
        }));
    };

    const resetPlayers = () => {
        setGameState((prev) => ({
            ...prev,
            players: DEFAULT_PLAYERS,
        }));
    };

    const startGame = () => {
        const activePlayers = gameState.players.filter(p => p.isActive);
        if (activePlayers.length < 3) return; // Should be handled by UI but good for safety

        const imposterIdx = Math.floor(Math.random() * activePlayers.length);
        const randomEntry = getRandomWord();

        setGameState((prev) => ({
            ...prev,
            phase: "role-assignment",
            currentPlayerIndex: 0,
            imposterIndex: imposterIdx,
            currentWord: randomEntry.word,
            currentCategory: randomEntry.category,
            hintsRevealed: 0,
            // Store full word object if needed, but for now just hints revealed count
        }));
    };

    const nextPlayer = () => {
        const activeHeaders = gameState.players.filter(p => p.isActive);

        if (gameState.currentPlayerIndex >= activeHeaders.length - 1) {
            // All players have seen roles
            setGameState(prev => ({ ...prev, phase: "playing" }));
        } else {
            setGameState(prev => ({
                ...prev,
                currentPlayerIndex: prev.currentPlayerIndex + 1
            }));
        }
    };

    const revealHint = () => {
        setGameState(prev => ({
            ...prev,
            hintsRevealed: Math.min(prev.hintsRevealed + 1, 5)
        }));
    };

    const endGame = () => {
        setGameState(prev => ({ ...prev, phase: "game-over" }));
    };

    // Move to the next round (reset hints, new word)
    const nextRound = () => {
        const randomEntry = getRandomWord();
        setGameState(prev => ({
            ...prev,
            phase: "playing",
            currentRound: prev.currentRound + 1,
            currentWord: randomEntry.word,
            currentCategory: randomEntry.category,
            hintsRevealed: 0,
        }));
    };

    // Show round-end screen
    const endRound = () => {
        setGameState(prev => ({ ...prev, phase: "round-end" }));
    };

    // Resets game but keeps players
    const resetGame = () => {
        setGameState(prev => ({
            ...prev,
            phase: "lobby",
            imposterIndex: null,
            currentWord: null,
            currentCategory: null,
            hintsRevealed: 0,
            currentPlayerIndex: 0,
            currentRound: 1,
        }));
    };

    const setGamePhase = (phase: GameState["phase"]) => {
        setGameState((prev) => ({ ...prev, phase }));
    };

    return (
        <GameContext.Provider
            value={{
                ...gameState,
                togglePlayerActive,
                addPlayer,
                removePlayer,
                resetPlayers,
                startGame,
                nextPlayer,
                revealHint,
                endGame,
                nextRound,
                endRound,
                resetGame,
                setGamePhase,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error("useGame must be used within a GameProvider");
    }
    return context;
};
