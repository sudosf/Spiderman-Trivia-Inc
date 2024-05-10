import APICall from '../common/APICall.js';

let subjectSelect, searchInput, leaderboardList;

document.addEventListener('click', (event) => {
    if (
        event.target.tagName.toLowerCase() === 'img' ||
        event.target.tagName.toLowerCase() === 'p' ||
        event.target.tagName.toLowerCase() === 'a'
    ) {
        const parentElement = event.target.parentElement;

        if (
            (parentElement.tagName.toLowerCase() === 'a' &&
                parentElement.href.includes('leaderboard')) ||
            (event.target.tagName.toLowerCase() === 'a' &&
                event.target.href.includes('leaderboard'))
        ) {
            subjectSelect = document.getElementById('subjectSelect');
            searchInput = document.getElementById('searchInput');
            leaderboardList = document.getElementById('leaderboardList');

            const fetchLeaderboard = async (subjectId) => {
                try {
                    const apiClient = new APICall();

                    const response = await apiClient.makeGetRequest(
                        `leaderboard/${subjectId}`,
                    );

                    const data = await response.data;

                    leaderboardList.innerHTML = '';

                    data.forEach((player, index) => {
                        const listItem = document.createElement('li');
                        listItem.innerHTML = `
                            <span class="player-position">${index + 1}.</span>
                            <span class="player-name">${player.username}</span>
                            <span class="player-score">${player.average_score}</span>
                        `;
                        leaderboardList.appendChild(listItem);
                    });
                } catch (error) {
                    console.log('Error fetching leaderboard:', error);
                }
            };

            subjectSelect.addEventListener('change', (event) => {
                const selectedSubjectId = event.target.value;
                fetchLeaderboard(selectedSubjectId);
            });

            searchInput.addEventListener('keyup', () => {
                const searchValue = searchInput.value.toLowerCase();
                const playerNames =
                    leaderboardList.querySelectorAll('.player-name');

                playerNames.forEach((playerName) => {
                    const playerNameText = playerName.textContent.toLowerCase();
                    const listItem = playerName.parentElement;
                    if (playerNameText.includes(searchValue)) {
                        listItem.style.display = 'flex';
                    } else {
                        listItem.style.display = 'none';
                    }
                });
            });

            const initialSubjectId = subjectSelect.value;
            fetchLeaderboard(initialSubjectId);
        }
    }
});
