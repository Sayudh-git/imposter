"use client";

import { useState } from "react";
import { useGame } from "@/context/GameContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Check, Plus, Trash2, Users } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import RoleRevealScreen from "@/components/game/RoleRevealScreen";
import GameScreen from "@/components/game/GameScreen";
import GameOverScreen from "@/components/game/GameOverScreen";
import RoundEndScreen from "@/components/game/RoundEndScreen";

export default function LobbyPage() {
  const {
    players,
    togglePlayerActive,
    addPlayer,
    removePlayer,
    resetPlayers,
    startGame,
  } = useGame();
  const [newPlayerName, setNewPlayerName] = useState("");

  const activePlayers = players.filter((p) => p.isActive);
  const activeCount = activePlayers.length;

  const handleAddPlayer = () => {
    if (!newPlayerName.trim()) return;
    if (players.some((p) => p.name.toLowerCase() === newPlayerName.trim().toLowerCase())) {
      toast.error("Player name must be unique!");
      return;
    }
    if (players.length >= 15) {
      toast.error("Max 15 players allowed!");
      return;
    }
    addPlayer(newPlayerName.trim());
    setNewPlayerName("");
    toast.success("Player added!");
  };

  const handleStartGame = () => {
    if (activeCount < 3) {
      toast.error("Need at least 3 active players to start!");
      return;
    }
    toast.dismiss();
    toast("Starting Game...", {
      description: "Redirecting to role reveal...",
      duration: 1500,
    });
    // Add a slight delay for effect
    setTimeout(() => {
      startGame();
    }, 500);
  };

  return (
    <main className="min-h-screen relative flex flex-col bg-gradient-to-b from-[#0a0f1e] to-[#1e293b] pb-24">
      {/* Header */}
      <header className="p-6 text-center space-y-2">
        <h1 className="font-heading font-extrabold text-4xl tracking-tight text-primary drop-shadow-sm">
          KOLKATA IMPOSTER
        </h1>
        <p className="font-body text-slate-400 text-sm tracking-wide">
          Pass & Play Social Deduction
        </p>
      </header>

      <div className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 flex flex-col gap-6">
        {/* Controls Row */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-between bg-surface/50 p-4 rounded-xl border border-white/5 shadow-inner backdrop-blur-sm">
          <div className="flex items-center gap-2 text-text-muted">
            <Users className="w-5 h-5 text-secondary" />
            <span className="font-medium">{activeCount} players selected</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetPlayers}
            className="text-muted-foreground hover:text-text-primary hover:bg-white/5"
          >
            Reset to Default
          </Button>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 place-items-stretch">
          <AnimatePresence mode="popLayout">
            {players.map((player) => (
              <motion.div
                key={player.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="w-full"
              >
                <Card
                  className={cn(
                    "h-full border-0 transition-all duration-200 group relative overflow-hidden ring-1 ring-inset",
                    player.isActive
                      ? "bg-slate-800/80 ring-white/10 shadow-lg shadow-black/20"
                      : "bg-slate-900/50 ring-white/5 opacity-60 grayscale-[0.5]"
                  )}
                >
                  <CardContent className="p-4 flex items-center justify-between gap-3 h-full">
                    <div
                      className="flex items-center gap-3 flex-1 cursor-pointer select-none"
                      onClick={() => togglePlayerActive(player.id)}
                    >
                      <Checkbox
                        checked={player.isActive}
                        onCheckedChange={() => togglePlayerActive(player.id)}
                        className={cn(
                          "bg-slate-950 border-slate-700 data-[state=checked]:bg-primary data-[state=checked]:text-black",
                          "transition-transform active:scale-95"
                        )}
                        id={`player-${player.id}`}
                      />
                      <label
                        htmlFor={`player-${player.id}`}
                        className={cn(
                          "font-heading font-semibold text-lg truncate cursor-pointer transition-colors",
                          player.isActive ? "text-text-primary" : "text-text-muted"
                        )}
                      >
                        {player.name}
                      </label>
                    </div>

                    {!player.isPermanent && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          removePlayer(player.id);
                        }}
                        className="h-8 w-8 text-slate-500 hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors opacity-0 group-hover:opacity-100 mobile-touch:opacity-100"
                        aria-label="Remove player"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </CardContent>

                  {/* Active glow effect */}
                  {player.isActive && (
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary/80 box-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                  )}
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Add Player Input Card */}
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-2 md:col-span-1"
          >
            <div className="h-full min-h-[80px] flex items-center gap-2 p-1">
              <div className="relative flex-1 group">
                <Input
                  placeholder="Add temporary player..."
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddPlayer();
                  }}
                  className="bg-slate-900/50 border-slate-700 focus:border-primary/50 focus:ring-primary/20 h-14 pl-4 font-body"
                />
                <Button
                  size="icon"
                  disabled={!newPlayerName.trim()}
                  onClick={handleAddPlayer}
                  className={cn(
                    "absolute right-2 top-2 h-10 w-10 transition-all rounded-lg",
                    newPlayerName.trim()
                      ? "bg-primary text-slate-900 hover:bg-primary-hover shadow-[0_0_10px_rgba(251,191,36,0.3)]"
                      : "bg-transparent text-slate-600 hover:bg-slate-800"
                  )}
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Spacing for sticky button */}
      <div className="h-24" />

      {/* Start Game Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-[#0a0f1e] via-[#0a0f1e]/90 to-transparent z-50 flex justify-center">
        <Button
          onClick={handleStartGame}
          disabled={activeCount < 3}
          className={cn(
            "w-full max-w-md h-16 text-lg font-heading font-bold uppercase tracking-widest shadow-xl transition-all duration-300",
            activeCount >= 3
              ? "bg-primary text-slate-950 hover:bg-primary-hover hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] active:scale-[0.98]"
              : "bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5"
          )}
        >
          {activeCount < 3 ? `Need ${3 - activeCount} more` : "Start Game"}
        </Button>
      </div>

      {/* Game Screens Overlay */}
      <AnimatePresence mode="wait">
        {useGame().phase === 'role-assignment' && (
          <RoleRevealScreen />
        )}
        {useGame().phase === 'playing' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
          >
            <GameScreen />
          </motion.div>
        )}
        {useGame().phase === 'round-end' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-45"
          >
            <RoundEndScreen />
          </motion.div>
        )}
        {useGame().phase === 'game-over' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
          >
            <GameOverScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
