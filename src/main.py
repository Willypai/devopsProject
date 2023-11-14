from todo import Todo

def main():
    # 創建待辦事項
    todo_item = Todo("Finish project", "Complete the project using GitHub")

    # 顯示待辦事項詳細信息
    print("Original Todo:")
    print(todo_item)

    # 標記事項為已完成
    todo_item.mark_as_completed()

    # 顯示更新後的待辦事項信息
    print("\nUpdated Todo:")
    print(todo_item)

if __name__ == "__main__":
    main()
