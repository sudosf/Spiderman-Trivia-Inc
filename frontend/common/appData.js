export const appData = {
    score: 0,
    subjectId: -1,
    subjectName: '',
    getScore: () => appData.score,
    updateScore: () => {
        appData.score += 1;
    },
    getSubjectId: () => appData.subjectId,
    updateSubjectId: (id) => {
        appData.subjectId = id;
    },
    getStubjectName: () => appData.subjectName,
    setSubjectName: (name) => {
        appData.subjectName = name;
    },
};
