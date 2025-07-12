document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("repo-form");
  const repoInput = document.getElementById("repo-name");
  const issuesList = document.getElementById("issues-list");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const repo = repoInput.value.trim();
    if (!repo) {
      alert("Please enter a repository name!");
      return;
    }

    // Clear any previous results
    issuesList.innerHTML = "";

    try {
      const response = await fetch(`https://api.github.com/repos/${repo}/issues`);
      if (!response.ok) {
        throw new Error("Repository not found or API error!");
      }

      const issues = await response.json();

      if (issues.length === 0) {
        issuesList.innerHTML = "<li>No open issues found.</li>";
        return;
      }

      issues.forEach((issue) => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${issue.html_url}" target="_blank">${issue.title}</a>`;
        issuesList.appendChild(li);
      });
    } catch (error) {
      issuesList.innerHTML = `<li>Error: ${error.message}</li>`;
    }
  });
});
