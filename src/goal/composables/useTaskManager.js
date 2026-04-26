export function useTaskManager(goal) {
  const addTask = (milestoneIndex, date, type) => {
    const milestone = goal.value.milestones[milestoneIndex]
    if (!milestone) return

    if (!milestone.tasks[date]) {
      milestone.tasks[date] = { main: [], side: [] }
    }

    const list = milestone.tasks[date][type]
    const max = type === 'main' ? 3 : 10

    if (list.length < max) {
      list.push({ id: Date.now() + Math.random(), text: '' })
    }
  }

  const updateTask = (milestoneIndex, date, type, taskIndex, value) => {
    const milestone = goal.value.milestones[milestoneIndex]
    if (milestone?.tasks?.[date]?.[type]?.[taskIndex]) {
      milestone.tasks[date][type][taskIndex].text = value
    }
  }

  const removeTask = (milestoneIndex, date, type, taskIndex) => {
    const milestone = goal.value.milestones[milestoneIndex]
    if (!milestone?.tasks?.[date]) return

    const day = milestone.tasks[date]
    day[type].splice(taskIndex, 1)

    if (day.main.length === 0 && day.side.length === 0) {
      delete milestone.tasks[date]
    }
  }

  return { addTask, updateTask, removeTask }
}
