/** Люди и чаты для кастомизации */
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
  {
    name: "Sergey Khrenov",
    color: "gold",
    after: "\\1F527",
  },
  {
    name: "Ekaterina Melnikova",
    color: "hotpink",
    after: "\\1F60A",
  },
  {
    name: "Yulia Lantratova",
    color: "gray",
    after: "\\1F480",
  },
];

/**
 *
 *
 * Дальше идет кот, не нада его трогать
 *
 *     /\_____/\
 *    /  o   o  \
 *   ( ==  ^  == )
 *    )         (
 *   (           )
 *  ( (  )   (  ) )
 * (__(__)___(__)__)
 *
 *
 */

/** Наблюдатель за DOM-ом */
const observer = new MutationObserver(mutationRecords => {
  mutationRecords.forEach(mutation => {
    const addedNodes = [...mutation.addedNodes];

    if (isAddedNodesContainsMessage(addedNodes)) {
      addedNodes.forEach(node => {
        const nameNode = node.querySelector(".yamb-message-user__name");

        if (nameNode) {
          customizeNodeWithUser(users, nameNode);
        }
      });
    }

    if (isAddedNodesContainsChat(addedNodes)) {
      addedNodes.forEach(node => {
        const nameNode = node.querySelector(".yamb-chat-list-item__name");

        if (nameNode) {
          customizeNodeWithUser(users, nameNode);
        }
      });
    }
  });
});

/**
 * Содержит ли добавленная на страницу нода блок сообщения
 * @param {array} addedNodes массив добавленных на страницу нод
 * @returns {boolean}
 */
function isAddedNodesContainsMessage(addedNodes) {
  return addedNodes.find(node => node.classList && node.classList.contains("message"));
}

/**
 * Содержит ли добавленная на страницу нода блок чата
 * @param {Node[]} addedNodes массив добавленных на страницу нод
 * @returns {boolean}
 */
function isAddedNodesContainsChat(addedNodes) {
  return addedNodes.find(
    node => node.classList && node.classList.contains("yamb-chat-list-item-block")
  );
}

/**
 * Стилизует ноду, если она содержит юзера
 * @param {{name: string;color: string;after: string;}[]} users массив юзеров, указанный в начале скрипта
 * @param {Node} node
 */
function customizeNodeWithUser(users, node) {
  const text = node.innerText;

  users.forEach(user => {
    if (text.includes(user.name)) {
      node.style.cssText = `
        color: ${user.color};
        --after: "${user.after}";
      `;
    }
  });
}

/** Прикрепляем нашего наблюдателя к корню приложения */
observer.observe(document.querySelector(".yamb-root"), {
  subtree: true,
  childList: true,
});

/**
 * Коты на заборе, ничего лишнего
 *
 *                       /^--^\     /^--^\     /^--^\
 *                       \____/     \____/     \____/
 *                      /      \   /      \   /      \
 *                     |        | |        | |        |
 *                      \__  __/   \__  __/   \__  __/
 * |^|^|^|^|^|^|^|^|^|^|^|^\ \^|^|^|^/ /^|^|^|^|^\ \^|^|^|^|^|^|^|^|^|^|^|^|
 * | | | | | | | | | | | | |\ \| | |/ /| | | | | | \ \ | | | | | | | | | | |
 * ########################/ /######\ \###########/ /#######################
 * | | | | | | | | | | | | \/| | | | \/| | | | | |\/ | | | | | | | | | | | |
 * |_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|
 *
 *
 */
