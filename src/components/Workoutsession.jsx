import React, { useState, useEffect, useRef } from 'react'

// ─── DATA ────────────────────────────────────────────────────────────────────

const workoutData = [
  {
    id: 1,
    title: 'Strength Training',
    emoji: '💪',
    accentColor: '#ef4444',
    gradientFrom: '#ef4444',
    gradientTo: '#b91c1c',
    duration: '60 min',
    calories: '450–550 kcal',
    difficulty: 'Intermediate',
    difficultyColor: '#f97316',
    description:
      'A progressive overload program targeting major muscle groups through compound and isolation movements. Designed to maximize hypertrophy and functional strength across all fitness levels.',
    overview:
      'This session is built around the big compound lifts that deliver the greatest muscle recruitment per rep. You will move through a structured warm-up, five primary exercises, and a cool-down stretch. Rest periods are calibrated to maintain intensity without sacrificing form.',
    benefits: [
      { icon: '🔥', label: 'Burns Fat', detail: 'Elevated metabolism lasts 24–48 hrs post-session' },
      { icon: '💪', label: 'Builds Muscle', detail: 'Targets 12+ major muscle groups per session' },
      { icon: '🦴', label: 'Bone Density', detail: 'Weight-bearing loads strengthen skeletal structure' },
      { icon: '⚡', label: 'Increases Strength', detail: 'Progressive overload drives consistent gains' },
    ],
    equipment: ['Barbell & plates', 'Adjustable dumbbells', 'Pull-up bar', 'Flat & incline bench', 'Power rack'],
    targetMuscles: ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Glutes', 'Quads', 'Hamstrings'],
    trainerNote:
      'Focus on a controlled 3-second eccentric (lowering) phase on every rep. Most beginners rush the negative — that is where muscle growth actually happens.',
    exercises: [
      {
        name: 'Barbell Bench Press',
        emoji: '🏋️',
        description:
          'Lie flat on a bench, grip the barbell slightly wider than shoulder-width. Lower the bar with control to mid-chest, pause briefly, then press explosively back to lockout. Keep your feet flat, core braced, and shoulder blades retracted throughout.',
        reps: '4 sets × 8–10 reps',
        rest: '90 sec rest',
        muscles: 'Chest, Front Delts, Triceps',
        difficulty: 'Intermediate',
      },
      {
        name: 'Conventional Deadlift',
        emoji: '🏗️',
        description:
          'Stand with feet hip-width, bar over mid-foot. Hinge at the hips, grip just outside your knees, and drive your chest up to create a neutral spine. Push the floor away as you stand, squeezing glutes at the top. Lower with control — do not drop the bar.',
        reps: '4 sets × 5–6 reps',
        rest: '2 min rest',
        muscles: 'Hamstrings, Glutes, Erectors, Traps',
        difficulty: 'Advanced',
      },
      {
        name: 'Back Squat',
        emoji: '🦵',
        description:
          'Position the bar across your upper traps, feet shoulder-width with toes turned slightly out. Brace your core, push your knees out over your toes, and descend until thighs are parallel to the floor. Drive through your heels to return to standing.',
        reps: '4 sets × 8–10 reps',
        rest: '90 sec rest',
        muscles: 'Quads, Glutes, Core, Hamstrings',
        difficulty: 'Intermediate',
      },
      {
        name: 'Weighted Pull-Up',
        emoji: '🔝',
        description:
          'Hang from a pull-up bar with an overhand grip slightly wider than shoulder-width. Initiate the movement by depressing your shoulder blades, then pull your chest towards the bar. Lower fully to a dead hang between each rep. Add a weight belt once bodyweight reps exceed 12.',
        reps: '3 sets × 6–8 reps',
        rest: '90 sec rest',
        muscles: 'Lats, Biceps, Rear Delts, Core',
        difficulty: 'Intermediate',
      },
      {
        name: 'Overhead Press',
        emoji: '🙆',
        description:
          'Stand with feet hip-width, barbell at collar-bone height with a grip just outside shoulder-width. Brace your entire core and press the bar vertically overhead to full arm extension. Avoid excessive lumbar extension — keep ribs down and hips stacked throughout.',
        reps: '3 sets × 8–10 reps',
        rest: '90 sec rest',
        muscles: 'Front & Lateral Delts, Triceps, Upper Traps',
        difficulty: 'Intermediate',
      },
    ],
  },
  {
    id: 2,
    title: 'Cardio Blast',
    emoji: '🏃',
    accentColor: '#3b82f6',
    gradientFrom: '#3b82f6',
    gradientTo: '#1d4ed8',
    duration: '45 min',
    calories: '500–650 kcal',
    difficulty: 'Beginner',
    difficultyColor: '#22c55e',
    description:
      'A high-energy cardiovascular session combining steady-state and interval techniques to torch calories, elevate VO₂ max, and build lasting aerobic endurance.',
    overview:
      'Structured in alternating work-to-rest blocks, this session keeps your heart rate between 75–90% of max for sustained caloric burn. No equipment needed — just a timer and the will to move.',
    benefits: [
      { icon: '❤️', label: 'Heart Health', detail: 'Reduces resting heart rate & blood pressure over time' },
      { icon: '🔥', label: 'Burns Fat', detail: 'Targets stored fat as primary fuel source' },
      { icon: '🫁', label: 'Lung Capacity', detail: 'Improves VO₂ max and respiratory efficiency' },
      { icon: '😴', label: 'Better Sleep', detail: 'Regulated cortisol improves sleep quality' },
    ],
    equipment: ['Treadmill (or open road)', 'Jump rope', 'Gym mat', 'Water bottle'],
    targetMuscles: ['Cardiovascular system', 'Calves', 'Hip flexors', 'Glutes', 'Core'],
    trainerNote:
      'On sprint intervals, hit 90–95% effort — not 100%. Sustainable high intensity across all rounds beats one perfect round followed by a collapse.',
    exercises: [
      {
        name: 'Treadmill Sprint Intervals',
        emoji: '⚡',
        description:
          'Set treadmill incline to 1%. Alternate 30 seconds at 85–90% max speed with 30 seconds at a recovery jog. The slight incline mimics outdoor running and increases glute activation compared to flat-surface sprints.',
        reps: '10 rounds × 30/30 intervals',
        rest: 'Built-in recovery jog',
        muscles: 'Quads, Calves, Glutes, Cardiovascular',
        difficulty: 'Intermediate',
      },
      {
        name: 'Jump Rope Double-Unders',
        emoji: '🪢',
        description:
          'Swing the rope with your wrists, not your arms. Jump just high enough to let the rope pass twice beneath you. If double-unders are new, substitute single-unders at a fast pace. Maintain a slight forward lean and keep landings soft and springy.',
        reps: '3 sets × 60 sec',
        rest: '30 sec rest',
        muscles: 'Calves, Shoulders, Forearms, Core',
        difficulty: 'Intermediate',
      },
      {
        name: 'Burpees',
        emoji: '🤸',
        description:
          'From standing, hinge forward and place hands on the floor, jump feet back to a plank, perform a push-up, jump feet forward, then explode upward reaching arms overhead. Keep the transition between each phase crisp and deliberate rather than sloppy.',
        reps: '4 sets × 12 reps',
        rest: '45 sec rest',
        muscles: 'Full body, Cardiovascular',
        difficulty: 'Intermediate',
      },
      {
        name: 'Mountain Climbers',
        emoji: '🧗',
        description:
          'In a high plank position with wrists stacked under shoulders, drive alternating knees towards your chest at a running pace. Keep hips level and resist the urge to let them rise. Aim for even, rhythmic breathing throughout.',
        reps: '3 sets × 40 sec',
        rest: '20 sec rest',
        muscles: 'Core, Hip Flexors, Shoulders',
        difficulty: 'Beginner',
      },
      {
        name: 'High Knees',
        emoji: '🦵',
        description:
          'Drive alternating knees up to hip height while pumping arms in opposition — same as your natural running motion. Stay on the balls of your feet and increase tempo progressively over each 30-second block. Use a target (your hands held at hip height) to ensure knee height.',
        reps: '4 sets × 30 sec',
        rest: '15 sec rest',
        muscles: 'Hip Flexors, Calves, Core, Cardiovascular',
        difficulty: 'Beginner',
      },
    ],
  },
  {
    id: 3,
    title: 'Flexibility Flow',
    emoji: '🧘',
    accentColor: '#22c55e',
    gradientFrom: '#22c55e',
    gradientTo: '#15803d',
    duration: '40 min',
    calories: '150–200 kcal',
    difficulty: 'Beginner',
    difficultyColor: '#22c55e',
    description:
      'A restorative mobility session blending static and dynamic stretching with yoga-inspired postures to reduce injury risk, improve posture, and accelerate recovery.',
    overview:
      'Designed for rest days or as a post-training cool-down, this flow sequences stretches from standing to floor-based work, targeting the areas most compressed by modern sedentary habits: hip flexors, thoracic spine, and posterior chain.',
    benefits: [
      { icon: '🤸', label: 'Flexibility', detail: 'Lengthens muscle tissue for improved range of motion' },
      { icon: '🛡️', label: 'Injury Prevention', detail: 'Reduces muscle imbalances that cause strains' },
      { icon: '🧠', label: 'Stress Relief', detail: 'Activates the parasympathetic nervous system' },
      { icon: '🏃', label: 'Better Posture', detail: 'Counteracts desk-related postural dysfunction' },
    ],
    equipment: ['Yoga mat', 'Foam roller (optional)', 'Yoga blocks (optional)'],
    targetMuscles: ['Hip flexors', 'Hamstrings', 'Thoracic spine', 'Glutes', 'Shoulders', 'Calves'],
    trainerNote:
      'Breathe into every stretch. Exhale as you deepen — the breath physically relaxes the nervous system, allowing greater range than forced pushing ever will.',
    exercises: [
      {
        name: 'Cobra Stretch',
        emoji: '🐍',
        description:
          'Lie face down with palms flat beneath your shoulders. Press into the floor and lift your chest upward, keeping elbows slightly bent and pubic bone pressed into the mat. Hold for 5 full breaths, feeling the stretch across your anterior torso and lumbar spine.',
        reps: '3 × 30 sec hold',
        rest: '15 sec between',
        muscles: 'Spinal extensors, Abdominals, Hip flexors',
        difficulty: 'Beginner',
      },
      {
        name: "Child's Pose",
        emoji: '🙏',
        description:
          'Kneel with knees wide and big toes touching. Sit hips back toward heels and walk hands forward until arms are fully extended. Rest your forehead on the mat and breathe deeply into your lower back. For a deeper shoulder stretch, walk hands slightly to each side.',
        reps: '3 × 45 sec hold',
        rest: '10 sec between',
        muscles: 'Lats, Lower back, Glutes, Hips',
        difficulty: 'Beginner',
      },
      {
        name: 'Standing Hamstring Stretch',
        emoji: '🦵',
        description:
          'Hinge at the hips with a flat back and reach toward the floor, bending knees slightly if needed. The goal is posterior chain length, not touching the floor. Hold the deepest position you can maintain without rounding your spine.',
        reps: '3 × 30 sec hold per side',
        rest: '10 sec between',
        muscles: 'Hamstrings, Calves, Lower back',
        difficulty: 'Beginner',
      },
      {
        name: 'Kneeling Hip Flexor Stretch',
        emoji: '🧎',
        description:
          'Drop to a low lunge with the back knee on the mat. Tuck your pelvis slightly and drive your hips forward until you feel a deep stretch through the front of your back thigh and hip. Raise the same-side arm overhead and lean gently to the opposite side for an added lateral component.',
        reps: '3 × 40 sec hold per side',
        rest: '10 sec between',
        muscles: 'Hip flexors, Psoas, Quads',
        difficulty: 'Beginner',
      },
      {
        name: 'Cat-Cow Spinal Wave',
        emoji: '🐄',
        description:
          'On all fours with neutral spine, exhale and round your back toward the ceiling (Cat), tucking chin and pelvis. Then inhale, drop your belly and lift head and tailbone (Cow). Move fluidly through the entire spinal column — from neck to tailbone — linking every movement to your breath.',
        reps: '3 × 10 breath cycles',
        rest: '15 sec between',
        muscles: 'Spinal extensors, Core, Neck',
        difficulty: 'Beginner',
      },
    ],
  },
  {
    id: 4,
    title: 'HIIT Power',
    emoji: '⚡',
    accentColor: '#a855f7',
    gradientFrom: '#a855f7',
    gradientTo: '#7c3aed',
    duration: '30 min',
    calories: '350–450 kcal',
    difficulty: 'Advanced',
    difficultyColor: '#ef4444',
    description:
      'Maximum-effort interval training that alternates explosive work bursts with active recovery. Clinically proven to burn more calories per minute than steady-state cardio and trigger 24-hour afterburn.',
    overview:
      'This 30-minute session is structured in Tabata-style blocks: 20 seconds all-out effort, 10 seconds recovery, repeated 8 times per exercise. The intensity demands full commitment — if you can hold a conversation, you are not working hard enough.',
    benefits: [
      { icon: '🔥', label: 'Afterburn Effect', detail: 'EPOC burns calories for up to 24 hours post-workout' },
      { icon: '⚡', label: 'Explosive Power', detail: 'Fast-twitch fiber recruitment improves athleticism' },
      { icon: '⏱️', label: 'Time Efficient', detail: '30 minutes outperforms 60 min of steady cardio' },
      { icon: '💪', label: 'Muscle Preservation', detail: 'Maintains lean mass while burning fat' },
    ],
    equipment: ['Gym mat', 'Box or step (optional)', 'Interval timer'],
    targetMuscles: ['Full body', 'Fast-twitch muscle fibers', 'Cardiovascular system'],
    trainerNote:
      'Scale the intensity, never the effort. If box jumps are too advanced, do jump squats to a target. The movement pattern matters more than the specific exercise.',
    exercises: [
      {
        name: 'Burpees',
        emoji: '💥',
        description:
          'The gold standard of HIIT. Drop to the floor, perform a push-up, jump feet to hands, and explode upward into a max-height jump. Every rep should be identical — the moment form degrades, reduce your pace rather than sacrificing quality.',
        reps: '8 rounds × 20 sec on / 10 sec off',
        rest: 'Built-in Tabata rest',
        muscles: 'Full body, Cardiovascular',
        difficulty: 'Advanced',
      },
      {
        name: 'Jump Squats',
        emoji: '🦘',
        description:
          'Descend into a full squat, then drive explosively upward, leaving the floor completely. Land softly with knees tracking toes, immediately absorb the impact and descend into the next rep. Arms swing forward on the jump and back during the squat for momentum.',
        reps: '8 rounds × 20 sec on / 10 sec off',
        rest: 'Built-in Tabata rest',
        muscles: 'Quads, Glutes, Calves, Core',
        difficulty: 'Intermediate',
      },
      {
        name: 'Explosive Push-Ups',
        emoji: '🤜',
        description:
          'Lower chest to the floor with full control, then push explosively so hands leave the ground at the top of each rep. If this is too advanced, perform standard fast push-ups with maximum speed in the pressing phase. Never sacrifice the full range of motion for speed.',
        reps: '8 rounds × 20 sec on / 10 sec off',
        rest: 'Built-in Tabata rest',
        muscles: 'Chest, Triceps, Shoulders, Core',
        difficulty: 'Advanced',
      },
      {
        name: 'Plank Jacks',
        emoji: '🌟',
        description:
          'From a straight-arm plank, jump both feet wide simultaneously, then jump them back together. Maintain a rigid torso throughout — hips should not rise or drop during the movement. This combines core stabilization with cardiovascular demand.',
        reps: '8 rounds × 20 sec on / 10 sec off',
        rest: 'Built-in Tabata rest',
        muscles: 'Core, Shoulders, Inner thighs, Cardiovascular',
        difficulty: 'Intermediate',
      },
      {
        name: 'Box Jumps',
        emoji: '📦',
        description:
          'Stand facing a sturdy box at 50–60cm height. Drop into a quarter-squat, swing arms back, then explode upward landing softly on the box with both feet flat. Stand fully upright, step down (never jump down), reset, and repeat. Focus on the landing — soft knees absorb impact.',
        reps: '4 sets × 10 reps',
        rest: '45 sec rest',
        muscles: 'Quads, Glutes, Calves, Hamstrings',
        difficulty: 'Advanced',
      },
    ],
  },
  {
    id: 5,
    title: 'Core Focus',
    emoji: '🎯',
    accentColor: '#f97316',
    gradientFrom: '#f97316',
    gradientTo: '#c2410c',
    duration: '35 min',
    calories: '200–280 kcal',
    difficulty: 'Intermediate',
    difficultyColor: '#f97316',
    description:
      'A targeted anterior and posterior core session building the deep stabilizing muscles — transverse abdominis, multifidus, and obliques — that protect your spine and underpin every athletic movement.',
    overview:
      'Core training is not about six-pack aesthetics — it is about building a rigid brace that transfers force between your upper and lower body without energy leakage. This session progresses from isometric holds to dynamic rotation to anti-rotation challenges.',
    benefits: [
      { icon: '🛡️', label: 'Spine Protection', detail: 'Strong core prevents lower back pain and injury' },
      { icon: '🏋️', label: 'Lifts More Weight', detail: 'Core strength directly improves compound lift numbers' },
      { icon: '⚖️', label: 'Better Balance', detail: 'Trains proprioceptive stability for all movements' },
      { icon: '🎽', label: 'Athletic Transfer', detail: 'Every sport requires rotational core power' },
    ],
    equipment: ['Gym mat', 'Decline bench (optional)', 'Cable machine (optional)'],
    targetMuscles: ['Rectus abdominis', 'Transverse abdominis', 'Obliques', 'Erector spinae', 'Glutes'],
    trainerNote:
      'If you feel your lower back during any ab exercise, you have lost tension in your anterior core. Stop, reset, and reduce range of motion before proceeding.',
    exercises: [
      {
        name: 'Dead Bug Plank',
        emoji: '🐛',
        description:
          'Lie on your back with arms pointing toward the ceiling and knees bent at 90° above hips. Simultaneously lower one arm overhead and extend the opposite leg toward the floor, stopping just before either touches the ground. Return slowly. The challenge is keeping your lower back pressed firmly into the mat throughout.',
        reps: '3 sets × 10 reps per side',
        rest: '45 sec rest',
        muscles: 'Transverse abdominis, Psoas, Obliques',
        difficulty: 'Intermediate',
      },
      {
        name: 'Russian Twist',
        emoji: '🌀',
        description:
          'Sit with knees bent, heels lifted, torso at 45°. Clasp hands or hold a weight plate at chest height. Rotate your torso fully to each side, allowing your gaze and shoulder to follow. The rotation should come from your thoracic spine, not just your arms swinging.',
        reps: '3 sets × 20 reps (10 per side)',
        rest: '45 sec rest',
        muscles: 'Obliques, Rectus abdominis, Hip flexors',
        difficulty: 'Intermediate',
      },
      {
        name: 'Bicycle Crunch',
        emoji: '🚲',
        description:
          'Lying flat with hands lightly behind head, simultaneously extend one leg while driving the opposite knee to your chest, rotating your torso to meet it elbow-to-knee. The movement should be slow and controlled — not a speed exercise. Full extension of the working leg is non-negotiable.',
        reps: '3 sets × 16 reps (8 per side)',
        rest: '30 sec rest',
        muscles: 'Obliques, Rectus abdominis',
        difficulty: 'Beginner',
      },
      {
        name: 'Hanging Leg Raises',
        emoji: '🏗️',
        description:
          'Hang from a pull-up bar with a dead hang grip. Keeping legs together and nearly straight, raise them to hip height — ideally to 90° or beyond if strength allows. Lower slowly with control. Avoid swinging — initiate each rep from a fully still position.',
        reps: '3 sets × 12 reps',
        rest: '60 sec rest',
        muscles: 'Lower rectus abdominis, Hip flexors, Forearms',
        difficulty: 'Advanced',
      },
      {
        name: 'Mountain Climbers',
        emoji: '🧗',
        description:
          'High plank position, shoulders stacked over wrists. Drive one knee toward your chest while the opposite leg drives back, alternating in a running motion. Keep hips stable and parallel to the floor — this is the most common breakdown point. Increase speed as stamina improves.',
        reps: '4 sets × 30 sec',
        rest: '20 sec rest',
        muscles: 'Core, Hip flexors, Shoulders, Cardiovascular',
        difficulty: 'Beginner',
      },
    ],
  },
]

const stats = [
  { value: '5,000+', label: 'Active Members' },
  { value: '100+', label: 'Expert Trainers' },
  { value: '50+', label: 'Programs' },
  { value: '10 Yrs', label: 'Experience' },
]

// ─── BEGINNER ROADMAP DATA ───────────────────────────────────────────────────

const beginnerRoadmap = {
  title: "Beginner's Roadmap",
  subtitle: 'Your first 12 weeks — zero to athlete.',
  intro:
    'Starting from scratch is the smartest position to be in. Your body responds faster to training stimuli than anyone else at the gym. This 12-week roadmap is designed to build habits, technique, and a base of fitness that will serve you for life.',
  phases: [
    {
      week: 'Weeks 1–3',
      phase: 'Foundation',
      emoji: '🌱',
      color: '#22c55e',
      colorDim: 'rgba(34,197,94,0.12)',
      colorBorder: 'rgba(34,197,94,0.25)',
      goal: 'Build the habit. Master basic movement patterns.',
      description:
        'Your only job right now is to show up three times a week and move your body. Do not worry about weight, speed, or performance. Learn how exercises feel and begin rewiring your nervous system for consistent effort.',
      sessions: [
        { day: 'Mon', label: 'Flexibility Flow', emoji: '🧘', note: 'Full-body mobility — 40 min' },
        { day: 'Wed', label: 'Cardio Blast (Light)', emoji: '🏃', note: 'Walk/jog intervals — 30 min' },
        { day: 'Fri', label: 'Core Focus', emoji: '🎯', note: 'Bodyweight core — 35 min' },
      ],
      tips: [
        'Sleep 7–9 hours — this is when your body adapts',
        'Drink at least 2.5L of water daily',
        'Log every session, even if it was terrible',
        'Do not skip the warm-up — ever',
      ],
      milestone: 'You can complete all three sessions in a week without excessive soreness.',
    },
    {
      week: 'Weeks 4–6',
      phase: 'Activation',
      emoji: '⚡',
      color: '#f97316',
      colorDim: 'rgba(249,115,22,0.12)',
      colorBorder: 'rgba(249,115,22,0.25)',
      goal: 'Increase frequency. Introduce resistance.',
      description:
        'Your body has adapted to moving consistently. Now we add a fourth session and introduce light resistance training. Technique is still the priority — use weights that feel almost too easy and focus purely on form.',
      sessions: [
        { day: 'Mon', label: 'Strength Training (Light)', emoji: '💪', note: 'Bodyweight + light dumbbells — 45 min' },
        { day: 'Tue', label: 'Cardio Blast', emoji: '🏃', note: 'Steady-state jog — 35 min' },
        { day: 'Thu', label: 'Core Focus', emoji: '🎯', note: 'Add resistance — 35 min' },
        { day: 'Sat', label: 'Flexibility Flow', emoji: '🧘', note: 'Full recovery session — 40 min' },
      ],
      tips: [
        'Add protein to every meal — aim for 1.6g per kg of bodyweight',
        'Film yourself doing compound lifts to check form',
        'Rest at least 48 hours between strength sessions',
        'Increase weights only when you can complete all reps cleanly',
      ],
      milestone: 'You can complete a 20-minute jog without stopping and 3 sets of push-ups.',
    },
    {
      week: 'Weeks 7–9',
      phase: 'Progression',
      emoji: '📈',
      color: '#3b82f6',
      colorDim: 'rgba(59,130,246,0.12)',
      colorBorder: 'rgba(59,130,246,0.25)',
      goal: 'Apply progressive overload. Track performance.',
      description:
        'This is where real transformation begins. You now increase resistance by 5–10% each week on your key lifts. Keep a training log — writing down numbers forces intentional progression and reveals patterns in your recovery.',
      sessions: [
        { day: 'Mon', label: 'Strength Training', emoji: '💪', note: 'Progressive overload — 60 min' },
        { day: 'Tue', label: 'Cardio Blast', emoji: '🏃', note: 'Introduce intervals — 40 min' },
        { day: 'Thu', label: 'Strength Training', emoji: '💪', note: 'Different muscle groups — 60 min' },
        { day: 'Fri', label: 'Core Focus + Flex', emoji: '🎯', note: 'Combined session — 40 min' },
        { day: 'Sat', label: 'Light Cardio', emoji: '🚶', note: 'Active recovery walk — 30 min' },
      ],
      tips: [
        'Increase one variable per week — weight, reps, or sets. Never all three.',
        'Deload (reduce intensity 40%) every 4th week to prevent burnout',
        'Take weekly progress photos — the mirror lies, photos do not',
        'Your diet is now 70% of your visible results',
      ],
      milestone: 'You have increased your starting weights by at least 20% on all major exercises.',
    },
    {
      week: 'Weeks 10–12',
      phase: 'Breakthrough',
      emoji: '🚀',
      color: '#a855f7',
      colorDim: 'rgba(168,85,247,0.12)',
      colorBorder: 'rgba(168,85,247,0.25)',
      goal: 'Peak intensity. Introduce HIIT. Set new targets.',
      description:
        'Your foundation is solid. Introduce HIIT Power sessions to your routine, push your strength numbers to new personal records, and begin planning your next 12-week cycle. You are no longer a beginner — you are an athlete in training.',
      sessions: [
        { day: 'Mon', label: 'Strength Training', emoji: '💪', note: 'Max effort — 60 min' },
        { day: 'Tue', label: 'HIIT Power', emoji: '⚡', note: 'First HIIT session — 30 min' },
        { day: 'Wed', label: 'Flexibility Flow', emoji: '🧘', note: 'Active recovery — 40 min' },
        { day: 'Thu', label: 'Strength Training', emoji: '💪', note: 'Volume focus — 60 min' },
        { day: 'Fri', label: 'Cardio Blast', emoji: '🏃', note: 'Sprint intervals — 45 min' },
        { day: 'Sat', label: 'Core Focus', emoji: '🎯', note: 'Heavy core work — 35 min' },
      ],
      tips: [
        'Set three specific goals for your next 12-week cycle',
        'Consider a body composition scan to measure actual fat vs muscle change',
        'You can now train with a partner to increase accountability',
        'Recovery is still as important as the training — protect your sleep',
      ],
      milestone: 'You complete a full HIIT session, run 5km without stopping, and feel genuinely strong.',
    },
  ],
  nutritionBasics: [
    { emoji: '🥩', label: 'Protein', tip: '1.6–2g per kg bodyweight daily. Chicken, eggs, fish, Greek yogurt.' },
    { emoji: '🌾', label: 'Carbs', tip: 'Your training fuel. Time them around workouts for best performance.' },
    { emoji: '🥑', label: 'Fats', tip: 'Essential for hormones and joint health. Avocado, nuts, olive oil.' },
    { emoji: '💧', label: 'Hydration', tip: 'Minimum 2.5L daily. Add 500ml for every hour of training.' },
  ],
  recoveryPillars: [
    { emoji: '😴', label: 'Sleep', tip: '7–9 hours. Muscle is built during sleep, not during training.' },
    { emoji: '🧊', label: 'Rest Days', tip: 'Two full rest days per week. Walking is fine. Hard training is not.' },
    { emoji: '🤸', label: 'Mobility', tip: 'Flexibility Flow once a week minimum. Prevents 80% of overuse injuries.' },
  ],
}

// ─── BEGINNER ROADMAP MODAL ──────────────────────────────────────────────────

function BeginnerRoadmapModal({ onClose }) {
  const scrollRef = useRef(null)
  const [activePhase, setActivePhase] = useState(0)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  const phase = beginnerRoadmap.phases[activePhase]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      style={{ backgroundColor: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(20px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        ref={scrollRef}
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl"
        style={{
          background: 'linear-gradient(135deg, rgba(12,12,20,0.99) 0%, rgba(16,8,16,0.99) 100%)',
          border: '1px solid rgba(239,68,68,0.25)',
          boxShadow: '0 0 80px rgba(239,68,68,0.15), 0 40px 80px rgba(0,0,0,0.9)',
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(239,68,68,0.3) transparent',
        }}
      >
        {/* Hero */}
        <div
          className="relative px-6 sm:px-8 pt-8 pb-6 rounded-t-3xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.12) 0%, rgba(249,115,22,0.06) 100%)' }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(239,68,68,0.18) 0%, transparent 65%)' }} />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-xs font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full"
                style={{ background: 'linear-gradient(135deg,#ef4444,#b91c1c)', color: '#fff' }}
              >
                ✦ Free Program
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-2">
              Beginner's <span style={{ background: 'linear-gradient(135deg,#ef4444,#f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Roadmap</span>
            </h2>
            <p className="text-white/50 text-sm">{beginnerRoadmap.subtitle}</p>
          </div>
        </div>

        <div className="px-6 sm:px-8 py-6 space-y-8">

          {/* Intro */}
          <p className="text-white/65 leading-relaxed text-sm">{beginnerRoadmap.intro}</p>

          {/* Phase selector tabs */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/35 mb-4">12-Week Plan — Select a Phase</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              {beginnerRoadmap.phases.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setActivePhase(i)}
                  className="rounded-2xl p-3 text-left transition-all duration-200 focus:outline-none"
                  style={{
                    background: activePhase === i ? p.colorDim : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${activePhase === i ? p.colorBorder : 'rgba(255,255,255,0.07)'}`,
                    boxShadow: activePhase === i ? `0 0 20px ${p.color}22` : 'none',
                    transform: activePhase === i ? 'scale(1.02)' : 'scale(1)',
                  }}
                >
                  <span className="text-xl block mb-1">{p.emoji}</span>
                  <p className="text-xs font-black text-white/80 uppercase tracking-wide">{p.phase}</p>
                  <p className="text-xs mt-0.5" style={{ color: activePhase === i ? p.color : 'rgba(255,255,255,0.35)' }}>{p.week}</p>
                </button>
              ))}
            </div>

            {/* Active phase detail */}
            <div
              key={activePhase}
              className="rounded-2xl overflow-hidden"
              style={{
                border: `1px solid ${phase.colorBorder}`,
                animation: 'fadeSlideIn 0.3s ease',
              }}
            >
              {/* Phase header */}
              <div
                className="px-5 py-4 flex items-center gap-4"
                style={{ background: phase.colorDim }}
              >
                <span className="text-3xl">{phase.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-black text-white text-lg">{phase.phase}</h4>
                    <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: phase.colorBorder, color: phase.color }}>{phase.week}</span>
                  </div>
                  <p className="text-white/50 text-xs mt-0.5">{phase.goal}</p>
                </div>
              </div>

              <div className="p-5 space-y-5">
                <p className="text-white/60 text-sm leading-relaxed">{phase.description}</p>

                {/* Weekly schedule */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/35 mb-3">Weekly Schedule</p>
                  <div className="space-y-2">
                    {phase.sessions.map((s, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 rounded-xl px-4 py-3"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <span
                          className="text-xs font-black w-8 text-center uppercase tracking-wide flex-shrink-0"
                          style={{ color: phase.color }}
                        >
                          {s.day}
                        </span>
                        <span className="text-base">{s.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-bold truncate">{s.label}</p>
                          <p className="text-white/40 text-xs">{s.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tips */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/35 mb-3">Key Principles</p>
                  <ul className="space-y-2">
                    {phase.tips.map((t, i) => (
                      <li key={i} className="flex gap-2 text-sm text-white/60">
                        <span style={{ color: phase.color }} className="flex-shrink-0 mt-0.5">▸</span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Milestone */}
                <div
                  className="rounded-xl p-4 flex items-start gap-3"
                  style={{ background: `${phase.color}0f`, border: `1px solid ${phase.colorBorder}` }}
                >
                  <span className="text-xl flex-shrink-0">🏆</span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: phase.color }}>Phase Milestone</p>
                    <p className="text-white/70 text-sm">{phase.milestone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Overall timeline visual */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/35 mb-4">Your 12-Week Journey</h3>
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-5 top-6 bottom-6 w-px" style={{ background: 'linear-gradient(to bottom, #22c55e, #f97316, #3b82f6, #a855f7)' }} />
              <div className="space-y-0">
                {beginnerRoadmap.phases.map((p, i) => (
                  <div key={i} className="flex gap-4 items-start pl-0 pb-6 last:pb-0">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-lg relative z-10"
                      style={{ background: p.colorDim, border: `2px solid ${p.color}` }}
                    >
                      {p.emoji}
                    </div>
                    <div className="pt-1.5">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-bold text-white text-sm">{p.phase}</p>
                        <span className="text-xs text-white/35">{p.week}</span>
                      </div>
                      <p className="text-xs text-white/45">{p.goal}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Nutrition basics */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/35 mb-4">Nutrition Basics</h3>
            <div className="grid grid-cols-2 gap-3">
              {beginnerRoadmap.nutritionBasics.map((n, i) => (
                <div key={i} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <span className="text-2xl block mb-2">{n.emoji}</span>
                  <p className="text-white font-bold text-sm mb-1">{n.label}</p>
                  <p className="text-white/45 text-xs leading-relaxed">{n.tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recovery pillars */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/35 mb-4">Recovery Pillars</h3>
            <div className="grid grid-cols-3 gap-3">
              {beginnerRoadmap.recoveryPillars.map((r, i) => (
                <div key={i} className="rounded-2xl p-4 text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <span className="text-2xl block mb-2">{r.emoji}</span>
                  <p className="text-white font-bold text-xs mb-1">{r.label}</p>
                  <p className="text-white/40 text-xs leading-relaxed">{r.tip}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sticky footer */}
        <div className="sticky bottom-0 p-6 sm:p-8 pt-4" style={{ background: 'linear-gradient(to top, rgba(12,12,20,1) 80%, transparent)' }}>
          <button
            className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.99]"
            style={{ background: 'linear-gradient(135deg, #ef4444, #b91c1c)', boxShadow: '0 8px 30px rgba(239,68,68,0.4)' }}
            onClick={onClose}
          >
            Begin Week 1 — I'm Ready →
          </button>
        </div>

        <style>{`
          @keyframes fadeSlideIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  )
}

// ─── MODAL ───────────────────────────────────────────────────────────────────

function WorkoutModal({ workout, onClose }) {
  const scrollRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  if (!workout) return null

  const difficultyColors = {
    Beginner: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    Intermediate: 'bg-orange-500/20 text-orange-300 border border-orange-500/30',
    Advanced: 'bg-red-500/20 text-red-300 border border-red-500/30',
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        ref={scrollRef}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl"
        style={{
          background: 'linear-gradient(135deg, rgba(15,15,20,0.98) 0%, rgba(20,10,15,0.99) 100%)',
          border: `1px solid ${workout.accentColor}33`,
          boxShadow: `0 0 60px ${workout.accentColor}22, 0 32px 64px rgba(0,0,0,0.8)`,
          scrollbarWidth: 'thin',
          scrollbarColor: `${workout.accentColor}44 transparent`,
        }}
      >
        {/* Hero strip */}
        <div
          className="relative h-48 sm:h-64 flex items-end p-6 sm:p-8 rounded-t-3xl overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${workout.gradientFrom}22 0%, ${workout.gradientTo}44 100%)` }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 30% 60%, ${workout.accentColor}33 0%, transparent 70%)`,
            }}
          />
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div className="relative z-10">
            <span className="text-5xl sm:text-6xl block mb-3">{workout.emoji}</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">{workout.title}</h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Badges */}
          <div className="flex flex-wrap gap-3">
            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${difficultyColors[workout.difficulty]}`}>
              {workout.difficulty}
            </span>
            <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-white/5 text-white/70 border border-white/10">
              ⏱ {workout.duration}
            </span>
            <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-white/5 text-white/70 border border-white/10">
              🔥 {workout.calories}
            </span>
          </div>

          {/* Overview */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Overview</h3>
            <p className="text-white/75 leading-relaxed">{workout.overview}</p>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Benefits</h3>
            <div className="grid grid-cols-2 gap-3">
              {workout.benefits.map((b, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-4"
                  style={{ background: `${workout.accentColor}0d`, border: `1px solid ${workout.accentColor}22` }}
                >
                  <span className="text-2xl block mb-1">{b.icon}</span>
                  <p className="text-white font-bold text-sm">{b.label}</p>
                  <p className="text-white/50 text-xs mt-0.5">{b.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Equipment & Muscles */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Equipment</h3>
              <ul className="space-y-1.5">
                {workout.equipment.map((e, i) => (
                  <li key={i} className="flex items-center gap-2 text-white/70 text-sm">
                    <span style={{ color: workout.accentColor }} className="text-xs">▸</span>
                    {e}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Target Muscles</h3>
              <div className="flex flex-wrap gap-2">
                {workout.targetMuscles.map((m, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full text-white/60"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Trainer note */}
          <div
            className="rounded-2xl p-5"
            style={{ background: `${workout.accentColor}0d`, border: `1px solid ${workout.accentColor}33` }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: workout.accentColor }}>
              Trainer's Note
            </p>
            <p className="text-white/75 text-sm leading-relaxed italic">"{workout.trainerNote}"</p>
          </div>

          {/* Exercises */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">
              Exercises ({workout.exercises.length})
            </h3>
            <div className="space-y-4">
              {workout.exercises.map((ex, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-5 transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-xl"
                      style={{ background: `${workout.accentColor}18`, border: `1px solid ${workout.accentColor}33` }}
                    >
                      {ex.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h4 className="text-white font-bold">{ex.name}</h4>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            background: ex.difficulty === 'Advanced' ? 'rgba(239,68,68,0.15)' : ex.difficulty === 'Intermediate' ? 'rgba(249,115,22,0.15)' : 'rgba(34,197,94,0.15)',
                            color: ex.difficulty === 'Advanced' ? '#fca5a5' : ex.difficulty === 'Intermediate' ? '#fdba74' : '#86efac',
                          }}
                        >
                          {ex.difficulty}
                        </span>
                      </div>
                      <p className="text-white/55 text-sm leading-relaxed mb-3">{ex.description}</p>
                      <div className="flex flex-wrap gap-3 text-xs">
                        <span className="text-white/50">
                          <span style={{ color: workout.accentColor }} className="font-bold">Sets/Reps</span> — {ex.reps}
                        </span>
                        <span className="text-white/50">
                          <span style={{ color: workout.accentColor }} className="font-bold">Rest</span> — {ex.rest}
                        </span>
                        <span className="text-white/50">
                          <span style={{ color: workout.accentColor }} className="font-bold">Muscles</span> — {ex.muscles}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky footer */}
        <div className="sticky bottom-0 p-6 sm:p-8 pt-4" style={{ background: 'linear-gradient(to top, rgba(15,15,20,1) 80%, transparent)' }}>
          <button
            className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.99]"
            style={{ background: `linear-gradient(135deg, ${workout.gradientFrom}, ${workout.gradientTo})`, boxShadow: `0 8px 30px ${workout.accentColor}44` }}
            onClick={onClose}
          >
            Start {workout.title} →
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── WORKOUT CARD ─────────────────────────────────────────────────────────────

function WorkoutCard({ workout, onClick }) {
  const [hovered, setHovered] = useState(false)

  const difficultyColors = {
    Beginner: { bg: 'rgba(34,197,94,0.12)', text: '#4ade80', border: 'rgba(34,197,94,0.3)' },
    Intermediate: { bg: 'rgba(249,115,22,0.12)', text: '#fb923c', border: 'rgba(249,115,22,0.3)' },
    Advanced: { bg: 'rgba(239,68,68,0.12)', text: '#f87171', border: 'rgba(239,68,68,0.3)' },
  }
  const dc = difficultyColors[workout.difficulty]

  return (
    <button
      type="button"
      onClick={() => onClick(workout)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
      style={{
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      <div
        className="rounded-2xl p-5 h-full transition-all duration-300"
        style={{
          background: hovered
            ? `linear-gradient(135deg, ${workout.accentColor}14 0%, rgba(10,10,15,0.9) 100%)`
            : 'rgba(255,255,255,0.03)',
          border: `1px solid ${hovered ? workout.accentColor + '55' : 'rgba(255,255,255,0.08)'}`,
          boxShadow: hovered ? `0 0 30px ${workout.accentColor}22, 0 16px 40px rgba(0,0,0,0.5)` : 'none',
        }}
      >
        {/* Icon + difficulty row */}
        <div className="flex items-center justify-between mb-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 transition-all duration-300"
            style={{
              background: hovered ? `${workout.accentColor}28` : `${workout.accentColor}14`,
              border: `1px solid ${workout.accentColor}33`,
            }}
          >
            {workout.emoji}
          </div>
          <span
            className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: dc.bg, color: dc.text, border: `1px solid ${dc.border}` }}
          >
            {workout.difficulty}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-black text-lg uppercase tracking-wide mb-2 transition-colors duration-300"
          style={{ color: hovered ? workout.accentColor : '#fff' }}
        >
          {workout.title}
        </h3>

        {/* Description */}
        <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">{workout.description}</p>

        {/* Stats row */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-white/40">⏱ {workout.duration}</span>
          <span className="text-xs text-white/40">🔥 {workout.calories}</span>
        </div>

        {/* Bottom gradient line */}
        <div
          className="mt-4 h-0.5 rounded-full transition-all duration-300"
          style={{
            background: `linear-gradient(to right, ${workout.gradientFrom}, ${workout.gradientTo})`,
            opacity: hovered ? 1 : 0.3,
          }}
        />
      </div>
    </button>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

const WorkoutSession = () => {
  const [activeModal, setActiveModal] = useState(null)
  const [showRoadmap, setShowRoadmap] = useState(false)
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <section
        ref={sectionRef}
        className="relative min-h-screen overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #080810 0%, #0d0d18 50%, #100810 100%)' }}
      >
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ background: 'radial-gradient(circle, #ef444488 0%, transparent 70%)' }}
          />
          <div
            className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15"
            style={{ background: 'radial-gradient(circle, #3b82f655 0%, transparent 70%)' }}
          />
          <div
            className="absolute top-1/2 left-0 w-64 h-64 rounded-full blur-3xl opacity-10"
            style={{ background: 'radial-gradient(circle, #a855f744 0%, transparent 70%)' }}
          />
          {/* Grid texture */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

            {/* ── LEFT SIDE ── */}
            <div
              className="w-full lg:w-[45%] flex flex-col"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(32px)',
                transition: 'opacity 0.7s ease, transform 0.7s ease',
              }}
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 max-w-12" style={{ background: 'linear-gradient(to right, #ef4444, transparent)' }} />
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">Premium Training</span>
              </div>

              {/* Heading */}
              <h1 className="font-black leading-none mb-6" style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)' }}>
                <span className="text-white block">FORGE YOUR</span>
                <span
                  className="block"
                  style={{
                    background: 'linear-gradient(135deg, #ef4444 0%, #f97316 50%, #ef4444 100%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'gradientShift 4s linear infinite',
                  }}
                >
                  LIMITS.
                </span>
              </h1>

              <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-md">
                Elite workout programming built with the science of professional athletic conditioning. Every session is a calculated step toward an extraordinary physique and unbreakable performance.
              </p>

              {/* Feature image */}
              <div className="relative rounded-3xl overflow-hidden flex-1 min-h-56 group">
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #1a0a0a 0%, #0d0d18 100%)',
                  }}
                >
                  {/* Placeholder visual when no real image — styled gym aesthetic */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      {/* <div className="text-8xl mb-4">🏋️‍♂️</div> */}
                      {/* <div className="text-white/20 text-sm font-bold uppercase tracking-widest">Place your image here</div> */}
                      {/* <div className="text-white/10 text-xs mt-1">jym22.jpg</div> */}
                    </div>
                  </div>
                  <img
                    src="/jym22.jpg"
                    alt="Elite workout session"
                    className="w-full h-full object-cover opacity-0 transition-opacity duration-500"
                    onLoad={(e) => { e.target.style.opacity = 1 }}
                  />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,16,0.8) 0%, transparent 50%)' }} />
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className="px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest text-white"
                    style={{ background: 'linear-gradient(135deg, #ef4444, #b91c1c)', boxShadow: '0 4px 16px rgba(239,68,68,0.4)' }}
                  >
                    ✦ Elite Training
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-3 mt-6">
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-3 text-center"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateY(0)' : 'translateY(20px)',
                      transition: `opacity 0.6s ease ${0.3 + i * 0.1}s, transform 0.6s ease ${0.3 + i * 0.1}s`,
                    }}
                  >
                    <p className="font-black text-white text-lg leading-none mb-1">{s.value}</p>
                    <p className="text-white/40 text-xs leading-tight">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT SIDE ── */}
            <div
              className="w-full lg:w-[55%]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(32px)',
                transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
              }}
            >
              {/* Section heading */}
              <div className="mb-6">
                <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-2">Select a Program</h2>
                <p className="text-2xl font-black text-white">
                  Featured{' '}
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #ef4444, #f97316)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Workouts
                  </span>
                </p>
                <p className="text-white/45 text-sm mt-1">Tap any card to see the full program, exercises, and trainer guidance.</p>
              </div>

              {/* Cards grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {workoutData.map((w, i) => (
                  <div
                    key={w.id}
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateY(0)' : 'translateY(24px)',
                      transition: `opacity 0.5s ease ${0.2 + i * 0.08}s, transform 0.5s ease ${0.2 + i * 0.08}s`,
                    }}
                  >
                    <WorkoutCard workout={w} onClick={setActiveModal} />
                  </div>
                ))}
              </div>

              {/* Bottom CTA strip */}
              <div
                className="mt-6 rounded-2xl p-5 flex items-center justify-between gap-4"
                style={{
                  background: 'linear-gradient(135deg, rgba(239,68,68,0.08) 0%, rgba(249,115,22,0.05) 100%)',
                  border: '1px solid rgba(239,68,68,0.15)',
                }}
              >
                <div>
                  <p className="text-white font-bold text-sm">Not sure where to start?</p>
                  <p className="text-white/45 text-xs mt-0.5">Our trainers build your personal program in 5 minutes.</p>
                </div>
                <button
                  onClick={() => setShowRoadmap(true)}
                  className="flex-shrink-0 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest text-white transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{ background: 'linear-gradient(135deg, #ef4444, #b91c1c)', boxShadow: '0 4px 20px rgba(239,68,68,0.3)' }}
                >
                  Get Started
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Gradient shift keyframes */}
        <style>{`
          @keyframes gradientShift {
            0% { background-position: 0% center; }
            100% { background-position: 200% center; }
          }
        `}</style>
      </section>

      {/* Modal portal */}
      {activeModal && (
        <WorkoutModal workout={activeModal} onClose={() => setActiveModal(null)} />
      )}
      {showRoadmap && (
        <BeginnerRoadmapModal onClose={() => setShowRoadmap(false)} />
      )}
    </>
  )
}

export default WorkoutSession