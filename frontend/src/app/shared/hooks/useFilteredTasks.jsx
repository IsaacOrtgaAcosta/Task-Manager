import { useMemo } from "react";

export const useFilteredTasks = (tasksList, search) => {
  const filteredTasks = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    // IF THERE'RE ANY FILTERED TASK, RETURN COMPLETE TASKS FROM DB
    if (!normalizedSearch) return tasksList;

    return tasksList.filter((task) => {
      const titleMatch = task.title?.toLowerCase().includes(normalizedSearch);
      const descriptionMatch = task.description
        ?.toLowerCase()
        .includes(normalizedSearch);

      return titleMatch || descriptionMatch;
    });
  }, [tasksList, search]);

  return filteredTasks;
};