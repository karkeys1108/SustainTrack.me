document.addEventListener('DOMContentLoaded', function () {
    const rewards = document.querySelectorAll('.reward-item');

    rewards.forEach(reward => {
        const taskName = reward.getAttribute('data-task');
        if (localStorage.getItem(taskName) === 'completed') {
            reward.classList.remove('hidden');
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');

    revealElements.forEach(reveal => {
        setTimeout(() => {
            reveal.classList.remove('hidden');
        }, 1000); // Adjust the delay as needed
    });
});
