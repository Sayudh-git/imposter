"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGame } from "@/context/GameContext";
import { useSound } from "@/hooks/useSound";
import { motion, AnimatePresence } from "framer-motion";
import { User, Eye, EyeOff, Smartphone, ArrowRight, ShieldAlert, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RoleRevealScreen() {
    const {
        players,
        currentPlayerIndex,
        imposterIndex,
        currentWord,
        currentCategory,
        nextPlayer,
        setGamePhase,
        hintsRevealed
    } = useGame();
    const { playSound } = useSound();

    const activePlayers = players.filter(p => p.isActive);
    const currentPlayer = activePlayers[currentPlayerIndex];

    // Fix: Get the actual imposter from the active players array
    const imposterPlayer = imposterIndex !== null ? activePlayers[imposterIndex] : null;
    const isImposter = currentPlayer && imposterPlayer && currentPlayer.id === imposterPlayer.id;

    // States: 'interstitial' | 'card'
    const [viewState, setViewState] = useState<'interstitial' | 'card'>('interstitial');
    const [isFlipped, setIsFlipped] = useState(false);
    const [canAdvance, setCanAdvance] = useState(false);

    // When player index changes, reset to interstitial
    useEffect(() => {
        setViewState('interstitial');
        setIsFlipped(false);
        setCanAdvance(false);
    }, [currentPlayerIndex]);

    const handleCardTap = () => {
        setIsFlipped(!isFlipped);

        // Allow advancing only after they've flipped at least once and flipped back
        if (!isFlipped) {
            // Flipping to reveal - do nothing regarding advance
        } else {
            // Flipping back to hide - enable advance after short delay
            setTimeout(() => setCanAdvance(true), 500);
        }
    };

    const handleNext = () => {
        setViewState('interstitial'); // Reset specifically for exit animation if needed
        nextPlayer();
    };

    if (!currentPlayer) return null;

    return (
        <div className="min-h-screen bg-[#0a0f1e] flex flex-col relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0f1e] to-[#0a0f1e] z-0" />

            {/* Persistent Header with Skip Button */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-50">
                <div className="text-slate-500 text-xs font-mono">
                    {currentPlayerIndex + 1}/{players.filter(p => p.isActive).length}
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        // Skip the entire role reveal phase and go straight to playing
                        setGamePhase('playing');
                    }}
                    className="text-slate-400 hover:text-primary hover:bg-primary/10 border border-slate-700/50 backdrop-blur-md"
                >
                    Skip to Hints <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
            </div>

            <AnimatePresence mode="wait">
                {viewState === 'interstitial' ? (
                    <motion.div
                        key="interstitial"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-8 relative z-10"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                            <Smartphone className="w-24 h-24 text-slate-400 relative z-10 animate-pulse" />
                        </div>

                        <div className="space-y-4">
                            <p className="text-slate-500 font-medium tracking-wide uppercase">Pass phone to</p>
                            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary">
                                {currentPlayer.name}
                            </h2>
                        </div>

                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => setViewState('card')}
                            className="mt-8 border-primary text-primary hover:bg-primary/10 text-lg h-14 px-8 min-w-[200px]"
                        >
                            I am {currentPlayer.name}
                        </Button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="card-view"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex-1 flex flex-col items-center justify-center p-4 relative"
                    >
                        {/* Header Hint */}
                        <div className="absolute top-8 text-slate-500 text-sm font-medium animate-pulse">
                            {isFlipped ? "Tap close to hide" : "Tap card to reveal"}
                        </div>

                        {/* 3D Flip Card Container */}
                        <div className="perspective-1000 w-full max-w-sm aspect-[3/4] max-h-[60vh] relative cursor-pointer group" onClick={handleCardTap}>
                            <motion.div
                                animate={{ rotateY: isFlipped ? 180 : 0 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                className="w-full h-full relative preserve-3d"
                            >
                                {/* Front (Hidden) */}
                                <div className="absolute inset-0 backface-hidden">
                                    <Card className="w-full h-full flex flex-col items-center justify-center bg-slate-800 border-2 border-primary/30 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:border-primary/60 transition-colors">
                                        <EyeOff className="w-16 h-16 text-primary mb-6" />
                                        <p className="text-slate-400 font-medium text-lg uppercase tracking-widest">Tap to Reveal</p>
                                        <p className="text-slate-600 text-xs mt-2">Make sure no one is watching</p>
                                    </Card>
                                </div>

                                {/* Back (Revealed) */}
                                <div className="absolute inset-0 backface-hidden rotate-y-180">
                                    {isImposter ? (
                                        <Card className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-red-950 via-slate-900 to-slate-950 border-2 border-red-600 shadow-[0_0_50px_rgba(220,38,38,0.3)]">
                                            <ShieldAlert className="w-20 h-20 text-red-500 mb-6 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
                                            <h2 className="text-2xl font-bold text-red-400 font-heading">YOU ARE THE</h2>
                                            <h1 className="text-5xl font-black text-red-500 mt-2 mb-6 tracking-tighter">IMPOSTER</h1>
                                            <div className="px-8 text-center space-y-2">
                                                <p className="text-slate-300">Blend in. Don't get caught.</p>
                                                <p className="text-slate-500 text-sm">Pretend you know the word.</p>
                                            </div>
                                        </Card>
                                    ) : (
                                        <Card className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 border-2 border-emerald-600 shadow-[0_0_50px_rgba(16,185,129,0.3)]">
                                            <CheckCircle className="w-16 h-16 text-emerald-500 mb-4 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                                            <p className="text-slate-400 text-sm uppercase tracking-widest font-bold">You are a</p>
                                            <h2 className="text-3xl font-bold text-emerald-400 mb-8 font-heading">CIVILIAN</h2>

                                            <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700/50 w-full max-w-[80%] text-center backdrop-blur-sm">
                                                <p className="text-xs text-slate-400 mb-2 uppercase tracking-wide">The Secret Word</p>
                                                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2 break-words leading-tight">
                                                    {currentWord}
                                                </h3>
                                                <div className="h-px w-16 bg-slate-700 mx-auto my-3" />
                                                <p className="text-xs text-slate-500">
                                                    Category: <span className="text-slate-300">{currentCategory}</span>
                                                </p>
                                            </div>
                                        </Card>
                                    )}
                                </div>
                            </motion.div>
                        </div>

                        {/* Advance Button (Only shows when card flipped BACK) */}
                        <AnimatePresence>
                            {canAdvance && !isFlipped && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute bottom-8 left-0 right-0 flex justify-center px-4"
                                >
                                    <Button
                                        onClick={handleNext}
                                        size="lg"
                                        className={cn(
                                            "w-full max-w-sm h-14 text-lg font-bold shadow-xl animate-in slide-in-from-bottom-4 duration-500",
                                            currentPlayerIndex === activePlayers.length - 1
                                                ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                                                : "bg-primary text-slate-900 hover:bg-primary/90"
                                        )}
                                    >
                                        {currentPlayerIndex === activePlayers.length - 1 ? (
                                            <>Start Playing <ArrowRight className="ml-2 w-5 h-5" /></>
                                        ) : (
                                            <>Next Player <ArrowRight className="ml-2 w-5 h-5" /></>
                                        )}
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
