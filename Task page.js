document.addEventListener('DOMContentLoaded', function () {
    const goals = document.querySelectorAll('.goal-item');

    goals.forEach(goal => {
        const progressBar = goal.querySelector('.progress-bar');
        const lockIcon = goal.querySelector('.fa-lock');
        goal.addEventListener('click', () => {
            updateProgress(goal, progressBar, lockIcon);
        });
    });

    function updateProgress(goal, progressBar, lockIcon) {
        let percentage = parseInt(progressBar.style.width) || 0;
        const newPercentage = percentage + 10;

        if (newPercentage >= 100) {
            percentage = 100;
            const completedMessage = document.getElementById('completedMessage');
            completedMessage.style.display = 'block';
            lockIcon.classList.remove('fa-lock');
            lockIcon.classList.add('fa-lock-open');
            goal.closest('.goal-container').classList.add('completed');
            localStorage.setItem(goal.querySelector('p').textContent, 'completed');
            setTimeout(() => {
                window.location.href = 'Reward page.html';
            }, 2000);
        } else {
            progressBar.style.width = newPercentage + '%';
        }
    }
});
