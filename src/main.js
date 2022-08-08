const users = [
  {
    name: "Constantin Potapov",
    color: "lightgreen",
    after: "\\1F408",
  },
  {
    name: "Inna Pristyagina",
    color: "plum",
    after: "\\1F33B",
  },
  {
    name: "Timur Makaev",
    color: "lightblue",
    after: "\\1F438",
  },
  {
    name: "Yaroslav Pavlov-Breycher",
    color: "palevioletred",
    after: "\\1F41E",
  },
  {
    name: "Boris Novoselov",
    color: "darkgoldenrod",
    after: "\\1F37A",
  },
];

const observer = new MutationObserver(mutationRecords => {
  mutationRecords.forEach(mutation => {
    const addedNodes = [...mutation.addedNodes];
    if (!isAddedNodesContainsMessage(addedNodes)) {
      return;
    }

    addedNodes.forEach(node => {
      const nameNode = node.querySelector(".yamb-message-user__name");

      if (nameNode) {
        customizeUser(users, nameNode);
      }
    });
  });
});

function isAddedNodesContainsMessage(addedNodes) {
  return addedNodes.find(node => node.classList && node.classList.contains("message"));
}

function customizeUser(users, nameNode) {
  const nameText = nameNode.innerText;

  users.forEach(user => {
    if (nameText.includes(user.name)) {
      nameNode.style.cssText = `
        color: ${user.color};
        --after: "${user.after}";
      `;
    }
  });
}

observer.observe(document.querySelector(".yamb-root"), {
  subtree: true,
  childList: true,
});
