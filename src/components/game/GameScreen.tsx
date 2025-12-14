"use client";

import { useState, useEffect } from "react";
import { useGame } from "@/context/GameContext";
import { useSound } from "@/hooks/useSound";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Zap, Skull, HelpCircle, Clock, Check } from "lucide-react";
import { GAME_DICTIONARY } from "@/lib/gameData";
import { cn } from "@/lib/utils";

export default function GameScreen() {
    const {
        currentWord,
        currentCategory,
        hintsRevealed,
        currentRound,
        maxRounds,
        revealHint,
        endRound
    } = useGame();
    const [canReveal, setCanReveal] = useState(true);
    const [cooldown, setCooldown] = useState(0);

    // Find the full word object to get hints
    const wordData = GAME_DICTIONARY.find(w => w.word === currentWord);

    // Debug logging
    useEffect(() => {
        if (!wordData && currentWord) {
            console.error('Word not found in dictionary:', currentWord);
        }
    }, [wordData, currentWord]);

    const hints = wordData?.hints || [
        "Thinking of a hint...",
        "Still thinking...",
        "This is a mystery...",
        "Almost there...",
        "Final clue..."
    ];

    // Auto-reveal first hint on mount
    useEffect(() => {
        if (hintsRevealed === 0) {
            const timer = setTimeout(() => {
                revealHint();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (cooldown > 0) {
            interval = setInterval(() => {
                setCooldown((prev) => prev - 1);
            }, 1000);
        } else {
            setCanReveal(true);
        }
        return () => clearInterval(interval);
    }, [cooldown]);

    const { playSound } = useSound();

    const handleReveal = () => {
        if (hintsRevealed < 5 && canReveal) {
            playSound('reveal');
            revealHint();
            setCanReveal(false);
            setCooldown(3);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0f1e] flex flex-col items-center pb-32">
            {/* Header */}
            <header className="w-full p-4 pt-12 flex justify-between items-center bg-gradient-to-b from-slate-900/95 to-slate-900/0 backdrop-blur-md sticky top-0 z-40 border-b border-white/5">
                <Badge variant="outline" className="bg-yellow-400/10 text-yellow-400 border-yellow-400/20 px-3 py-1 flex gap-2 items-center font-medium shadow-[0_0_10px_rgba(251,191,36,0.2)]">
                    {currentCategory === 'Landmark' ? '🏛️' :
                        currentCategory === 'Food' ? '🥘' :
                            currentCategory === 'Transport' ? '🚕' :
                                currentCategory === 'Politics' ? '⚖️' :
                                    currentCategory === 'Cinema' ? '🎬' :
                                        currentCategory === 'Historical Figure' ? '📜' :
                                            '✨'}
                    {currentCategory}
                </Badge>
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Round</p>
                        <p className="text-lg font-bold text-primary font-heading relative top-[-2px]">{currentRound}/{maxRounds}</p>
                    </div>
                </div>
            </header>

            <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-4 flex flex-col gap-6">
                {/* Hint Flashcards */}
                <div className="space-y-4">
                    {hints.map((hint, index) => {
                        const isRevealed = index < hintsRevealed;
                        const isNext = index === hintsRevealed;

                        return (
                            <motion.div
                                key={index}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="w-full"
                            >
                                {isRevealed ? (
                                    // Revealed Flashcard
                                    <motion.div
                                        initial={{ rotateX: 90 }}
                                        animate={{ rotateX: 0 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                    >
                                        <Card className="bg-gradient-to-br from-yellow-400/20 via-yellow-500/5 to-transparent border border-yellow-400/30 shadow-[0_0_20px_rgba(251,191,36,0.1)] backdrop-blur-sm overflow-hidden">
                                            <div className="p-5 flex gap-4">
                                                <div className="shrink-0 w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center border border-yellow-400/30 text-yellow-400 font-bold font-heading text-xl">
                                                    {index + 1}
                                                </div>
                                                <div className="flex-1 pt-1">
                                                    <p className="text-slate-50 text-lg leading-relaxed font-medium font-sans">
                                                        {hint}
                                                    </p>
                                                </div>
                                                <div className="shrink-0">
                                                    <Unlock className="w-5 h-5 text-yellow-500/50" />
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ) : (
                                    // Locked Flashcard (Clickable if it's the next one)
                                    <motion.div
                                        whileTap={isNext && canReveal ? { scale: 0.98 } : {}}
                                        onClick={isNext && canReveal ? handleReveal : undefined}
                                        className={cn(isNext && canReveal ? "cursor-pointer" : "cursor-default")}
                                    >
                                        <Card className={cn(
                                            "border backdrop-blur-sm transition-all duration-300",
                                            isNext
                                                ? "bg-slate-800/80 border-slate-700 hover:border-yellow-400/30 shadow-lg"
                                                : "bg-slate-900/40 border-slate-800/50 opacity-60"
                                        )}>
                                            <div className="p-5 flex items-center gap-4">
                                                <div className={cn(
                                                    "shrink-0 w-10 h-10 rounded-full flex items-center justify-center border transition-colors",
                                                    isNext ? "bg-slate-700 border-slate-600 text-slate-400" : "bg-slate-800 border-slate-700 text-slate-600"
                                                )}>
                                                    <Lock className="w-4 h-4" />
                                                </div>
                                                <div className="flex-1">
                                                    {isNext ? (
                                                        <div className="text-slate-400 font-medium flex items-center gap-2">
                                                            <span>Tap to Reveal Hint {index + 1}</span>
                                                            {canReveal && <span className="flex h-2 w-2 rounded-full bg-yellow-400 animate-ping" />}
                                                        </div>
                                                    ) : (
                                                        <div className="h-4 bg-slate-800 rounded-full w-24" />
                                                    )}
                                                </div>
                                            </div>
                                            {isNext && <div className="h-1 w-full bg-slate-700/50 overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-yellow-400/50"
                                                    initial={{ x: "-100%" }}
                                                    animate={{ x: "100%" }}
                                                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                                />
                                            </div>}
                                        </Card>
                                    </motion.div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Progress Indicator */}
                <div className="flex items-center justify-center gap-2 py-2">
                    {hints.map((_, index) => (
                        <motion.div
                            key={index}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className={cn(
                                "h-2 rounded-full transition-all duration-500",
                                index < hintsRevealed
                                    ? "w-8 bg-yellow-400"
                                    : "w-2 bg-slate-700"
                            )}
                        />
                    ))}
                </div>
            </main>

            {/* Bottom Controls - Raised and Safe Area Aware */}
            <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a0f1e] via-[#0a0f1e] to-transparent pt-12 pb-10 px-4 flex flex-col gap-3 z-50">
                {/* Reveal Button */}
                <Button
                    onClick={handleReveal}
                    disabled={hintsRevealed >= 5 || !canReveal}
                    className={cn(
                        "w-full h-16 text-xl font-bold shadow-2xl transition-all font-heading rounded-xl border border-white/5",
                        hintsRevealed >= 5
                            ? "bg-slate-800/80 text-slate-500"
                            : canReveal
                                ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 hover:from-yellow-300 hover:to-amber-400 hover:scale-[1.01] active:scale-[0.98] shadow-[0_0_30px_rgba(245,158,11,0.3)]"
                                : "bg-slate-800/80 text-slate-400"
                    )}
                >
                    {hintsRevealed >= 5 ? (
                        <>
                            <Check className="w-6 h-6 mr-2" />
                            All Hints Revealed
                        </>
                    ) : !canReveal ? (
                        <>
                            <Clock className="w-5 h-5 mr-2 animate-spin" />
                            Wait {cooldown}s
                        </>
                    ) : (
                        <>
                            <Zap className="w-6 h-6 mr-2 fill-current animate-pulse" />
                            Reveal Hint {hintsRevealed + 1}/5
                        </>
                    )}
                </Button>

                {/* End Round Button */}
                <AnimatePresence>
                    {hintsRevealed >= 3 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="w-full"
                        >
                            <Button
                                variant="outline"
                                onClick={endRound}
                                className="w-full h-14 bg-red-950/40 border-red-500/30 text-red-200 hover:bg-red-900/50 hover:border-red-400 font-heading font-bold text-lg rounded-xl backdrop-blur-md"
                            >
                                <Skull className="w-5 h-5 mr-2" />
                                {currentRound >= maxRounds ? "REVEAL IMPOSTER" : "END ROUND"}
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
