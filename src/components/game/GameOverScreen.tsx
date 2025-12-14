"use client";

import { useEffect } from "react";
import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { RotateCcw, Home, Sparkles, AlertCircle, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function GameOverScreen() {
    const {
        players,
        imposterIndex,
        currentWord,
        hintsRevealed,
        resetGame,
        resetPlayers
    } = useGame();

    const imposter = imposterIndex !== null ? players[imposterIndex] : null;

    useEffect(() => {
        // Trigger confetti explosion
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => {
            return Math.random() * (max - min) + min;
        }

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    const handlePlayAgain = () => {
        resetGame(); // Goes to role assignment with SAME players
    };

    const handleLobby = () => {
        resetPlayers(); // Goes to lobby and resets to default (or we could just go to lobby keeping players)
        // Based on implementation of resetPlayers in GameContext, it resets list to default.
        // If we want to keep players but go to lobby, we need a different action. 
        // For now, let's assume "Back to Lobby" means full reset as per user request Step 3C
    };

    return (
        <div className="min-h-screen bg-[#0a0f1e] flex flex-col items-center justify-center p-6 text-center space-y-8 animate-in fade-in duration-1000">
            {/* Spotlight Effect Background */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-400/10 via-[#0a0f1e] to-[#0a0f1e] z-0 pointer-events-none" />

            <div className="relative z-10 space-y-2">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-slate-400 font-bold tracking-[0.2em] uppercase"
                >
                    The Imposter Was
                </motion.p>
                <motion.h1
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", delay: 1, duration: 0.8 }}
                    className="text-5xl md:text-7xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 to-yellow-600 drop-shadow-sm"
                >
                    {imposter?.name || "Unknown"}
                </motion.h1>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
                className="relative z-10 w-full max-w-sm"
            >
                <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-md p-6 space-y-6">
                    <div className="space-y-1">
                        <p className="text-xs text-slate-500 uppercase font-bold">The Secret Word</p>
                        <p className="text-2xl text-slate-200 font-bold">{currentWord}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                            <p className="text-slate-500 text-xs">Hints Used</p>
                            <p className="text-xl font-mono text-primary">{hintsRevealed}/5</p>
                        </div>
                        <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                            <p className="text-slate-500 text-xs">Total Players</p>
                            <p className="text-xl font-mono text-primary">{players.filter(p => p.isActive).length}</p>
                        </div>
                    </div>
                </Card>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
                className="relative z-10 flex flex-col gap-3 w-full max-w-xs"
            >
                <Button
                    onClick={handlePlayAgain}
                    size="lg"
                    className="h-14 bg-primary text-slate-950 hover:bg-primary-hover font-bold text-lg shadow-[0_0_20px_rgba(251,191,36,0.3)]"
                >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Play Again
                </Button>
                <Button
                    variant="ghost"
                    onClick={handleLobby}
                    className="text-slate-400 hover:text-white hover:bg-white/5"
                >
                    <Home className="w-4 h-4 mr-2" />
                    Back to Lobby
                </Button>
            </motion.div>
        </div>
    );
}
