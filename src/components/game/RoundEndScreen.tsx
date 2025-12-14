"use client";

import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { PlayCircle, Skull, Trophy, Zap } from "lucide-react";

export default function RoundEndScreen() {
    const {
        currentRound,
        maxRounds,
        hintsRevealed,
        currentWord,
        nextRound,
        endGame
    } = useGame();

    const isLastRound = currentRound >= maxRounds;

    return (
        <div className="min-h-screen bg-[#0a0f1e] flex flex-col items-center justify-center p-6 relative">
            {/* Background Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-[#0a0f1e] to-[#0a0f1e] z-0" />

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative z-10 w-full max-w-md space-y-8"
            >
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="flex items-center justify-center gap-2 text-yellow-400">
                        <Trophy className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-heading font-black text-white">
                        Round {currentRound} Complete!
                    </h1>
                    <p className="text-slate-400">
                        {isLastRound ? "Final Round Finished!" : `${maxRounds - currentRound} rounds remaining`}
                    </p>
                </div>

                {/* Stats Card */}
                <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-md p-6 space-y-4">
                    <div className="text-center space-y-1">
                        <p className="text-xs text-slate-500 uppercase font-bold">The Secret Word Was</p>
                        <p className="text-2xl text-primary font-bold">{currentWord}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                        <div className="text-center">
                            <p className="text-slate-500 text-xs mb-1">Round</p>
                            <p className="text-3xl font-bold text-white">{currentRound}/{maxRounds}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-slate-500 text-xs mb-1">Hints Used</p>
                            <p className="text-3xl font-bold text-primary">{hintsRevealed}/5</p>
                        </div>
                    </div>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                    {!isLastRound ? (
                        <>
                            <Button
                                onClick={nextRound}
                                size="lg"
                                className="w-full h-14 bg-primary text-slate-950 hover:bg-primary-hover font-bold text-lg shadow-[0_0_20px_rgba(251,191,36,0.3)]"
                            >
                                <PlayCircle className="w-5 h-5 mr-2" />
                                Continue to Round {currentRound + 1}
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={endGame}
                                className="w-full h-12"
                            >
                                <Skull className="w-4 h-4 mr-2" />
                                End Game & Reveal Imposter
                            </Button>
                        </>
                    ) : (
                        <Button
                            onClick={endGame}
                            size="lg"
                            className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-bold text-lg"
                        >
                            <Skull className="w-5 h-5 mr-2" />
                            Reveal the Imposter
                        </Button>
                    )}
                </div>

                <p className="text-center text-slate-500 text-sm">
                    {isLastRound
                        ? "Time to find out who the imposter is!"
                        : "Ready for the next challenge?"}
                </p>
            </motion.div>
        </div>
    );
}
