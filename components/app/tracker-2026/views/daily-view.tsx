"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Check,
  X,
  Sunrise,
  Target,
  Ban,
  Trophy,
  Moon,
  Flame,
  Brain,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Editable list item component
const EditableItem = ({
  placeholder,
  checked,
  onToggle,
  onDelete,
  value,
  onChange,
}: {
  placeholder: string;
  checked?: boolean;
  onToggle?: () => void;
  onDelete?: () => void;
  value: string;
  onChange: (val: string) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      className={cn(
        "group flex items-center gap-3 p-3 rounded-lg transition-all",
        "bg-muted/30 hover:bg-muted/50 border border-transparent hover:border-border/30"
      )}
    >
      {onToggle && (
        <button
          onClick={onToggle}
          className={cn(
            "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0",
            checked
              ? "bg-emerald-500 border-emerald-500"
              : "border-muted-foreground/30 hover:border-blue-400"
          )}
        >
          {checked && <Check className="w-3 h-3 text-white" />}
        </button>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "flex-1 bg-transparent border-none outline-none text-sm",
          "placeholder:text-muted-foreground/50",
          checked && "line-through text-muted-foreground"
        )}
      />
      {onDelete && (
        <button
          onClick={onDelete}
          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded transition-all"
        >
          <X className="w-3 h-3 text-red-400" />
        </button>
      )}
    </motion.div>
  );
};

// Section wrapper with icon
const Section = ({
  icon: Icon,
  title,
  iconColor = "text-blue-400",
  children,
}: {
  icon: React.ElementType;
  title: string;
  iconColor?: string;
  children: React.ReactNode;
}) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-5 bg-card/40 backdrop-blur-sm border border-border/30 rounded-2xl h-fit"
  >
    <div className="flex items-center gap-2.5 mb-4">
      <div className={cn("p-2 rounded-xl bg-muted/50", iconColor)}>
        <Icon className="w-4 h-4" />
      </div>
      <h3 className="font-semibold text-foreground">{title}</h3>
    </div>
    {children}
  </motion.section>
);

// Add button component
const AddButton = ({ onClick, label }: { onClick: () => void; label: string }) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-2 p-3 rounded-lg transition-all",
      "border border-dashed border-border/50 hover:border-blue-400/50",
      "text-muted-foreground hover:text-blue-400 text-sm"
    )}
  >
    <Plus className="w-4 h-4" />
    <span>{label}</span>
  </button>
);

export const DailyView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // State for all the lists
  const [topPriorities, setTopPriorities] = useState([
    { id: 1, text: "", done: false },
    { id: 2, text: "", done: false },
    { id: 3, text: "", done: false },
  ]);

  const [firstHour, setFirstHour] = useState("");

  const [todos, setTodos] = useState<{ id: number; text: string; done: boolean }[]>([]);

  const [notTodos, setNotTodos] = useState<{ id: number; text: string }[]>([]);

  const [wins, setWins] = useState<{ id: number; text: string }[]>([]);

  const [tomorrowPrep, setTomorrowPrep] = useState<{ id: number; text: string }[]>([]);

  const [habits, setHabits] = useState([
    { id: 1, name: "10 min meditation", done: false },
    { id: 2, name: "Gym", done: false },
    { id: 3, name: "No socials before 12", done: false },
  ]);

  // Date navigation
  const goToPrevDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const isToday =
    currentDate.toDateString() === new Date().toDateString();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // List helpers
  const addTodo = () => {
    setTodos([...todos, { id: Date.now(), text: "", done: false }]);
  };

  const addNotTodo = () => {
    setNotTodos([...notTodos, { id: Date.now(), text: "" }]);
  };

  const addWin = () => {
    setWins([...wins, { id: Date.now(), text: "" }]);
  };

  const addTomorrowPrep = () => {
    setTomorrowPrep([...tomorrowPrep, { id: Date.now(), text: "" }]);
  };

  return (
    <div className="space-y-6 w-full">
      {/* Date Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={goToPrevDay}
          className="p-2.5 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border/30"
        >
          <ChevronLeft className="w-5 h-5 text-muted-foreground" />
        </button>

        <div className="flex items-center gap-3">
          {isToday && (
            <span className="text-sm font-semibold text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/20">
              Today
            </span>
          )}
          <h2 className="text-xl font-semibold text-foreground">
            {formatDate(currentDate)}
          </h2>
        </div>

        <button
          onClick={goToNextDay}
          className="p-2.5 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border/30"
        >
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Row 1: Morning Setup */}
      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {/* First Hour */}
        <Section icon={Sunrise} title="Protect the First Hour" iconColor="text-amber-400">
          <textarea
            value={firstHour}
            onChange={(e) => setFirstHour(e.target.value)}
            placeholder="What will you do in your first hour? No phone, no distractions..."
            className={cn(
              "w-full h-28 p-3 rounded-lg resize-none",
              "bg-muted/30 border border-transparent focus:border-amber-400/30",
              "text-sm placeholder:text-muted-foreground/50 outline-none transition-colors"
            )}
          />
        </Section>

        {/* Top 3 Priorities */}
        <Section icon={Target} title="Top 3 Priorities" iconColor="text-orange-400">
          <div className="space-y-2">
            {topPriorities.map((priority, index) => (
              <div key={priority.id} className="flex items-center gap-2">
                <span className="text-xs font-bold text-muted-foreground/70 w-5 text-center">
                  {index + 1}.
                </span>
                <div className="flex-1">
                  <EditableItem
                    placeholder={`Priority ${index + 1}...`}
                    checked={priority.done}
                    onToggle={() => {
                      const updated = [...topPriorities];
                      updated[index].done = !updated[index].done;
                      setTopPriorities(updated);
                    }}
                    value={priority.text}
                    onChange={(val) => {
                      const updated = [...topPriorities];
                      updated[index].text = val;
                      setTopPriorities(updated);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Habits */}
        <Section icon={Flame} title="Daily Habits" iconColor="text-red-400">
          <div className="flex flex-wrap gap-2">
            {habits.map((habit) => (
              <button
                key={habit.id}
                onClick={() => {
                  setHabits(
                    habits.map((h) =>
                      h.id === habit.id ? { ...h, done: !h.done } : h
                    )
                  );
                }}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all",
                  habit.done
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-muted/30 text-muted-foreground border border-transparent hover:border-border/50"
                )}
              >
                {habit.done && <Check className="w-3 h-3 inline mr-1" />}
                {habit.name}
              </button>
            ))}
          </div>
        </Section>
      </div>

      {/* Row 2: During the Day */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* To-Do List */}
        <Section icon={Check} title="To-Do" iconColor="text-emerald-400">
          <div className="space-y-2">
            {todos.map((todo) => (
              <EditableItem
                key={todo.id}
                placeholder="What needs to get done?"
                checked={todo.done}
                onToggle={() => {
                  setTodos(
                    todos.map((t) =>
                      t.id === todo.id ? { ...t, done: !t.done } : t
                    )
                  );
                }}
                onDelete={() => setTodos(todos.filter((t) => t.id !== todo.id))}
                value={todo.text}
                onChange={(val) => {
                  setTodos(
                    todos.map((t) =>
                      t.id === todo.id ? { ...t, text: val } : t
                    )
                  );
                }}
              />
            ))}
            <AddButton onClick={addTodo} label="Add task" />
          </div>
        </Section>

        {/* Not-To-Do */}
        <Section icon={Ban} title="Not-To-Do" iconColor="text-red-400">
          <p className="text-xs text-muted-foreground mb-3">
            Distractions to avoid today
          </p>
          <div className="space-y-2">
            {notTodos.map((item) => (
              <EditableItem
                key={item.id}
                placeholder="What to avoid today..."
                onDelete={() =>
                  setNotTodos(notTodos.filter((t) => t.id !== item.id))
                }
                value={item.text}
                onChange={(val) => {
                  setNotTodos(
                    notTodos.map((t) =>
                      t.id === item.id ? { ...t, text: val } : t
                    )
                  );
                }}
              />
            ))}
            <AddButton onClick={addNotTodo} label="Add distraction to avoid" />
          </div>
        </Section>
      </div>

      {/* Row 3: End of Day Reflection */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Daily Wins */}
        <Section icon={Trophy} title="Today's Wins" iconColor="text-yellow-400">
          <p className="text-xs text-muted-foreground mb-3">
            Track your wins, no matter how small
          </p>
          <div className="space-y-2">
            {wins.map((win) => (
              <EditableItem
                key={win.id}
                placeholder="What went well today?"
                onDelete={() => setWins(wins.filter((w) => w.id !== win.id))}
                value={win.text}
                onChange={(val) => {
                  setWins(
                    wins.map((w) =>
                      w.id === win.id ? { ...w, text: val } : w
                    )
                  );
                }}
              />
            ))}
            <AddButton onClick={addWin} label="Add a win" />
          </div>
        </Section>

        {/* Set Up Tomorrow */}
        <Section icon={Moon} title="Set Up Tomorrow" iconColor="text-indigo-400">
          <p className="text-xs text-muted-foreground mb-3">
            Prepare tonight so you wake up ready to win
          </p>
          <div className="space-y-2">
            {tomorrowPrep.map((item) => (
              <EditableItem
                key={item.id}
                placeholder="Prep for tomorrow..."
                onDelete={() =>
                  setTomorrowPrep(tomorrowPrep.filter((t) => t.id !== item.id))
                }
                value={item.text}
                onChange={(val) => {
                  setTomorrowPrep(
                    tomorrowPrep.map((t) =>
                      t.id === item.id ? { ...t, text: val } : t
                    )
                  );
                }}
              />
            ))}
            <AddButton onClick={addTomorrowPrep} label="Add prep item" />
          </div>
        </Section>
      </div>
    </div>
  );
};
