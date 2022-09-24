class Trie {
  #tree = {};

  insert(word) {
    let tree = this.#tree;
    for (const w of word) {
      if (!tree[w]) {
        tree[w] = {}
      }
      tree = tree[w];
    }
    tree.isEnd = true;
  }

  search(word) {
    let tree = this.#tree;
    for (const w of word) {
      if (!tree[w]) return false;
      tree = tree[w];
    }
    return !!tree.isEnd;
  }

  startsWith(prefix) {
    let tree = this.#tree;
    for (const w of prefix) {
      if (!tree[w]) return false;
      tree = tree[w];
    }
    return true;
  }
}

const trie = new Trie();
trie.insert("apple");
trie.search("apple");   // 返回 True
trie.search("app");     // 返回 False
trie.startsWith("app"); // 返回 True
trie.insert("app");
trie.search("app");
