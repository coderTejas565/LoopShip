"use client";

import { motion } from "framer-motion";
import {
  Bot,
  FileText,
  ClipboardList,
  GitPullRequest,
  Rocket,
} from "lucide-react";

export function WorkflowAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* glow */}

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.04, 0.1, 0.04],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="
          absolute
          left-1/2
          top-[65%]
          h-[1000px]
          w-[1000px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-foreground
          blur-[220px]
        "
      />

      {/* paths */}

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 1000"
      >
        <motion.path
          d="M 250 650 Q 450 650 700 650"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.12"
        />

        <motion.path
          d="M 700 650 Q 850 550 980 470"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.12"
        />

        <motion.path
          d="M 700 650 Q 850 650 980 650"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.12"
        />

        <motion.path
          d="M 700 650 Q 850 750 980 830"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.12"
        />

        <motion.path
          d="M 980 470 Q 1120 560 1220 650"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.12"
        />

        <motion.path
          d="M 980 650 Q 1120 650 1220 650"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.12"
        />

        <motion.path
          d="M 980 830 Q 1120 740 1220 650"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.12"
        />
      </svg>

      {/* energy pulse */}

      <motion.div
        animate={{
          x: [250, 700, 980, 1220],
          y: [650, 650, 650, 650],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          h-4
          w-4
          rounded-full
          bg-foreground
          shadow-[0_0_40px_white]
        "
      />

      {/* feature */}

      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="
          absolute
          left-[10%]
          top-[72%]
        "
      >
        <Card
          title="Feature Request"
          value="Add OAuth Login"
        />
      </motion.div>

      {/* AI core */}

      <div
        className="
          absolute
          left-1/2
          top-[72%]
          -translate-x-1/2
          -translate-y-1/2
        "
      >
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            left-1/2
            top-1/2
            h-[260px]
            w-[260px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-foreground/10
          "
        />

        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            left-1/2
            top-1/2
            h-[180px]
            w-[180px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-foreground/20
          "
        />

        <motion.div
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="
            flex
            h-28
            w-28
            items-center
            justify-center
            rounded-3xl
            border
            bg-background
            backdrop-blur-xl
          "
        >
          <Bot className="h-10 w-10" />
        </motion.div>
      </div>

      {/* outputs */}

      <Node
        icon={<FileText size={18} />}
        title="PRD"
        left="68%"
        top="52%"
      />

      <Node
        icon={<ClipboardList size={18} />}
        title="Tasks"
        left="73%"
        top="72%"
      />

      <Node
        icon={<GitPullRequest size={18} />}
        title="Review"
        left="68%"
        top="88%"
      />

      {/* ship */}

      <motion.div
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="
          absolute
          right-[8%]
          top-[72%]
        "
      >
        <Card
          title="Shipped"
          value="Ready For Production 🚀"
        />
      </motion.div>
    </div>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        bg-background/80
        backdrop-blur-xl
        px-5
        py-4
      "
    >
      <p className="text-xs text-muted-foreground">
        {title}
      </p>

      <p className="mt-2 font-medium">
        {value}
      </p>
    </div>
  );
}

function Node({
  icon,
  title,
  left,
  top,
}: {
  icon: React.ReactNode;
  title: string;
  left: string;
  top: string;
}) {
  return (
    <motion.div
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
      }}
      style={{
        left,
        top,
      }}
      className="absolute"
    >
      <div
        className="
          flex
          items-center
          gap-3
          rounded-2xl
          border
          bg-background/80
          backdrop-blur-xl
          px-4
          py-3
        "
      >
        {icon}
        <span>{title}</span>
      </div>
    </motion.div>
  );
}