#!/bin/bash
# Génération parallèle des visuels du portfolio de Noé
DIR=/home/z/my-project/public/images
mkdir -p $DIR/projects

gen() {
  local prompt="$1" out="$2" size="$3"
  for attempt in 1 2 3; do
    if [ -s "$out" ]; then return 0; fi
    timeout 180 z-ai image -p "$prompt" -o "$out" -s "$size" >/dev/null 2>&1
    if [ -s "$out" ]; then echo "OK $(basename $out)"; return 0; fi
    sleep 2
  done
  echo "FAIL $(basename $out)"
}

# Vague 1 : portrait + 4 covers
gen "Professional editorial portrait photograph of a young man in his early twenties, junior software developer, short dark brown hair, calm confident expression with a subtle warm smile, wearing a plain dark green crewneck sweater, clean light gray studio background, soft natural diffused lighting, head and shoulders framing, facing the camera, minimalist professional photography, high quality" "$DIR/noe-portrait.png" "864x1152" &
gen "Minimalist abstract composition representing a first personal website, simple browser window shape drawn with thin black lines, light gray background, one emerald green geometric accent, editorial minimal design, subtle depth, no text, high quality" "$DIR/projects/premier-portfolio.png" "1344x768" &
gen "Minimalist editorial illustration of an elegant showcase website for a local artisan shop, clean layered card layouts, thin black lines on light gray background, emerald green accents, modern minimal design, no text, high quality" "$DIR/projects/site-vitrine.png" "1344x768" &
gen "Minimalist abstract representation of a weather application interface, geometric sun and cloud shapes drawn with thin black lines, light gray background, single emerald green accent, editorial minimal design, no text, high quality" "$DIR/projects/app-meteo.png" "1344x768" &
gen "Minimalist abstract representation of a task management application, checkbox list shapes with thin black lines on light gray background, one emerald green checkmark accent, editorial minimal design, no text, high quality" "$DIR/projects/task-manager.png" "1344x768" &
wait
echo "--- WAVE 1 DONE ---"

# Vague 2 : 5 covers
gen "Minimalist editorial illustration of a modern blog interface, clean typographic layout blocks, thin black lines on light gray background, emerald green accent line, refined minimal design, no text, high quality" "$DIR/projects/blog-nextjs.png" "1344x768" &
gen "Minimalist abstract representation of a REST API backend architecture, connected nodes and structured rectangles, thin black lines on light gray background, emerald green highlighted nodes, editorial minimal design, no text, high quality" "$DIR/projects/api-bibliotheque.png" "1344x768" &
gen "Minimalist abstract representation of a SaaS analytics dashboard, simple bar chart and line graph shapes with thin black lines on light gray background, emerald green data accents, editorial minimal design, no text, high quality" "$DIR/projects/dashboard-saas.png" "1344x768" &
gen "Minimalist abstract representation of a collaborative notes application, overlapping document shapes with thin black lines, light gray background, emerald green accent, editorial minimal design, no text, high quality" "$DIR/projects/notes-collab.png" "1344x768" &
gen "Minimalist abstract representation of a link shortening service, long chain transforming into a single short arrow, thin black lines on light gray background, emerald green arrow accent, editorial minimal design, no text, high quality" "$DIR/projects/lien-court.png" "1344x768" &
wait
echo "--- WAVE 2 DONE ---"
echo "ALL DONE"
