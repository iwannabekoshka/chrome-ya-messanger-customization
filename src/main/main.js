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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === "getLocalStorage") {
    sendResponse({ data: localStorage });
  }

  if (request.type === "setLocalStorage") {
    localStorage.setItem("users-customization", JSON.stringify(request.users));
    customizeNodes();
  }
});

const SELECTORS_TO_CUSTOMIZE = [
  ".yamb-message-user__name",
  ".yamb-chat-list-item__name",
  ".yamb-text.yamb-text_leading.yamb-text-container",
  ".yamb-chat-list-item__author",
];

function customizeNodes() {
  SELECTORS_TO_CUSTOMIZE.forEach(selector => {
    const nodes = document.querySelectorAll(selector);
    nodes.forEach(node => {
      customizeNodeWithUser(JSON.parse(localStorage.getItem("users-customization")) || [], node);
    });
  });
}

customizeNodes();

/** Наблюдатель за DOM-ом */
const observer = new MutationObserver(mutationRecords => {
  mutationRecords.forEach(mutation => {
    const addedNodes = [...mutation.addedNodes];

    if (
      isAddedNodesContainsMessage(addedNodes) ||
      isAddedNodesContainsChat(addedNodes) ||
      isAddedNodesContainsChatTitle(addedNodes)
    ) {
      customizeNodes();
    }

    // Кастомизация внутри чата
    if (isAddedNodesContainsMessage(addedNodes)) {
      addedNodes.forEach(node => {
        const nameNode = node.querySelector(".yamb-message-user__name");

        if (nameNode) {
          customizeNodeWithUser(
            JSON.parse(localStorage.getItem("users-customization")) || [],
            nameNode
          );
        }
      });
    }

    // Кастомизация списка чатов
    if (isAddedNodesContainsChat(addedNodes)) {
      addedNodes.forEach(node => {
        const nameNode = node.querySelector(".yamb-chat-list-item__name");

        if (nameNode) {
          customizeNodeWithUser(
            JSON.parse(localStorage.getItem("users-customization")) || [],
            nameNode
          );
        }
      });
    }

    // Кастомизация тайтла чата
    if (isAddedNodesContainsChatTitle(addedNodes)) {
      console.log("title");
      addedNodes.forEach(node => {
        const nameNode = node.querySelector(".yamb-text.yamb-text_leading.yamb-text-container");

        if (nameNode) {
          customizeNodeWithUser(
            JSON.parse(localStorage.getItem("users-customization")) || [],
            nameNode
          );
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
 * Содержит ли добавленная на страницу нода имя чата (человека)
 * @param {Node[]} addedNodes массив добавленных на страницу нод
 * @returns {boolean}
 */
function isAddedNodesContainsChatTitle(addedNodes) {
  return addedNodes.find(node => node.classList && node.classList.contains("yamb-chat"));
}

/**
 * Стилизует ноду, если она содержит юзера
 * @param {{name: string;color: string;after: string;}[]} users массив юзеров, указанный в начале скрипта
 * @param {Node} node
 */
function customizeNodeWithUser(users, node) {
  const text = node.innerText;

  let notMeeted = true;
  users.forEach(user => {
    if (text.includes(user.name)) {
      node.style.cssText = `
        color: ${user.color};
        --after: "${user.after}";
      `;

      notMeeted = false;
    }
  });

  if (notMeeted) {
    node.style.cssText = ``;
  }
}

/** Прикрепляем нашего наблюдателя к корню приложения */
observer.observe(document.querySelector("body"), {
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
