import React from "react";

const CodeBlock = ({ code, language = "java" }) => (
  <div style={{ backgroundColor: "#1e1e1e", color: "#d4d4d4", padding: "15px", borderRadius: "8px", overflowX: "auto", fontFamily: "'Courier New', Courier, monospace", fontSize: "0.9rem", margin: "15px 0", borderLeft: "4px solid var(--accent-color)" }}>
    <pre style={{ margin: 0 }}>
      <code>{code}</code>
    </pre>
  </div>
);

export function Section1() {
  return (
    <div className="section active">
      <h1>Bölüm 1: İkili Arama Ağaçları (BST) ve Kod Analizi</h1>
      <p>BST (Binary Search Tree), arama işlemlerini <code>O(log n)</code> sürede yapabilmek için tasarlanmış, her sol çocuğun ebeveyninden küçük, her sağ çocuğun ise büyük olduğu veri yapısıdır.</p>
      
      <div className="card">
        <h3>İteratif Ekleme (Insertion) Algoritması</h3>
        <p>Ağaca eleman eklerken özyineli (recursive) fonksiyon kullanmak Call Stack'i şişirebilir. Bu yüzden endüstri standartlarında <strong>iteratif (while döngülü)</strong> yaklaşım tercih edilir. Ancak burada dikkat edilmesi gereken en önemli şey, ağacın dibine indiğimizde (<code>current == null</code>) bir önceki düğümü (ebeveyni) unutmamaktır!</p>
        <CodeBlock code={`public void insert(int val) {
    Node newNode = new Node(val);
    if (root == null) {
        root = newNode;
        return;
    }

    Node current = root;
    Node parent = null; // En kritik değişken! Bizi uçuruma düşmekten kurtarır.

    while (current != null) {
        parent = current; // Uçuruma düşmeden hemen önce son konumu kaydet.
        if (val < current.val) {
            current = current.left;
        } else if (val > current.val) {
            current = current.right;
        } else {
            return; // Duplicate (Kopya) değere izin vermiyoruz.
        }
    }

    // current null oldu (uçurumdayız). parent ise eklenecek yeri biliyor.
    if (val < parent.val) parent.left = newNode;
    else parent.right = newNode;
}`} />
      </div>

      <div className="card">
        <h3>Düğüm Silme (Deletion) ve Inorder Successor Mantığı</h3>
        <p>Ağaçtan düğüm silmek, 3 farklı senaryo barındırır. En zoru "İki Çocuklu Düğüm" silmektir. Kökü veya ortadaki bir düğümü sildiğinizde, ağacın hiyerarşisi bozulmamalıdır. Bunun için silinen düğümün yerine, <strong>"Sağ alt ağacın EN KÜÇÜK elemanı (Inorder Successor)"</strong> geçirilir.</p>
        <CodeBlock code={`public Node deleteNode(Node root, int key) {
    if (root == null) return null;

    if (key < root.val) {
        root.left = deleteNode(root.left, key);
    } else if (key > root.val) {
        root.right = deleteNode(root.right, key);
    } else {
        // Hedef Düğümü Bulduk!
        
        // Senaryo 1 ve 2: Tek çocuklu veya çocuksuz (Leaf) düğüm
        if (root.left == null) return root.right;
        else if (root.right == null) return root.left;

        // Senaryo 3: İki Çocuklu Düğüm
        // Sağ alt ağacın en küçük değerini bul (Inorder Successor)
        root.val = findMin(root.right);

        // Kopyaladığımız o küçük elemanı, kendi orijinal yerinden sil!
        root.right = deleteNode(root.right, root.val);
    }
    return root;
}

private int findMin(Node node) {
    int minv = node.val;
    while (node.left != null) {
        minv = node.left.val;
        node = node.left; // Sürekli sola git
    }
    return minv;
}`} />
        <p><strong>Neden Sağ Alt Ağacın En Küçüğü?</strong> Çünkü o sayı, silinen düğümün solundaki HER ŞEYDEN büyük, sağındaki HER ŞEYDEN (kendisinden büyük olanlardan) küçüktür. Tam olarak o boşluğa uyan tek mükemmel denge taşıdır.</p>
      </div>

      <div className="card">
        <h3>Ağaçlarda Gezinme (Traversals) - Zaman: Θ(n)</h3>
        <p>Ağaçtaki her düğüme tam bir kez dokunmak zorundayız. Bu yüzden gezinme her zaman doğrusal (Linear) zaman alır.</p>
        <ul>
          <li><strong>Inorder (Sol-Kök-Sağ):</strong> <code>inorder(node.left); print(node.val); inorder(node.right);</code> Ağacı sıralı (Sorted) olarak yazdırır.</li>
          <li><strong>Preorder (Kök-Sol-Sağ):</strong> Ağacın bir kopyasını klonlamak (Serialization) için kullanılır.</li>
          <li><strong>Postorder (Sol-Sağ-Kök):</strong> İşletim sistemlerinde klasör silerken (Önce içindeki dosyaları, en son klasörün kendisini sil) kullanılır.</li>
        </ul>
      </div>
    </div>
  );
}

export function Section2() {
  return (
    <div className="section active">
      <h1>Bölüm 2: Hashing Mimarisi ve Kod Yapıları</h1>
      <p>Veriyi <code>O(1)</code> zamanda bulmak için geliştirilen muazzam matematiksel yapılardır. Ancak veriler çakıştığında (Collision) kod mimarisi hayat kurtarır.</p>
      
      <div className="card">
        <h3>Separate Chaining (Ayrı Zincirleme) Kod Yapısı</h3>
        <p>Eğer aynı yuvaya (slota) birden fazla eleman denk gelirse, o yuvanın içinden bir "Bağlı Liste (Linked List)" uzatılır. Bu sayede dizinin boyutu dolmasına rağmen sonsuz eleman ekleyebilirsiniz.</p>
        <CodeBlock code={`class HashNode {
    int key;
    String value;
    HashNode next; // Bağlı liste göstericisi
    
    public HashNode(int key, String value) {
        this.key = key;
        this.value = value;
    }
}

// Separate Chaining Ekleme Fonksiyonu
public void insert(int key, String value) {
    int index = (key.hashCode() & 0x7fffffff) % tableSize; // Pozitif garantili indeks
    HashNode head = table[index];

    // Aynı key varsa güncelle
    HashNode current = head;
    while (current != null) {
        if (current.key == key) {
            current.value = value;
            return;
        }
        current = current.next;
    }

    // Yeni düğümü zincirin EN BAŞINA ekle (O(1) sürmesi için)
    HashNode newNode = new HashNode(key, value);
    newNode.next = head;
    table[index] = newNode;
}`} />
        <p><strong>Neden En Başa Ekliyoruz?</strong> Listeyi sonuna kadar tarayıp kuyruğa eklemek <code>O(N)</code> zaman alır. Oysa yeni elemanı doğrudan başa (head) ekleyip, eski head'i onun <code>next</code>'ine bağlamak <code>O(1)</code>'dir!</p>
      </div>

      <div className="card">
        <h3>Closed Hashing: Linear Probing ve Mezar Taşı (Tombstone)</h3>
        <p>Eğer dizinin içinde kalmak istiyorsak (bağlı liste yoksa), dolu bir yuva gördüğümüzde "bir sonrakine" (veya karesel adım sonrasına) atlarız. Ancak buradan eleman silmek kabustur. Doğrudan <code>null</code> yaparsanız, daha önce çarpışıp ileri kaymış elemanları bir daha asla bulamazsınız!</p>
        <CodeBlock code={`class Entry {
    int key;
    String value;
    boolean isDeleted; // Mezar Taşı Bayrağı (Tombstone)
}

public String search(int key) {
    int index = key % tableSize;
    int startIndex = index; // Sonsuz döngüyü önlemek için başladığımız yeri tutuyoruz.

    while (table[index] != null) { // Boş (hiç dokunulmamış) bir yer görene kadar git
        // Eğer silinmemişse ve key eşleşiyorsa BULDUM!
        if (!table[index].isDeleted && table[index].key == key) {
            return table[index].value;
        }
        index = (index + 1) % tableSize; // Linear Probing: Bir sonrakine atla
        
        if (index == startIndex) break; // Bütün tabloyu döndük, bulamadık.
    }
    return null; // Boşluğa denk geldik, demek ki hiç eklenmemiş.
}`} />
        <p>İşte <code>isDeleted</code> (Tombstone) bayrağının gücü budur. Döngü <code>table[index] != null</code> şartına bağlı olduğu için, silinen yere <code>null</code> yazsaydık döngü erken kırılır ve ilerideki veriler bulunamazdı. <code>isDeleted = true</code> yaptığımızda döngü bunu "dolu" sayarak atlamaya devam eder.</p>
      </div>
    </div>
  );
}

export function Section3() {
  return (
    <div className="section active">
      <h1>Bölüm 3: Hashing İstatistikleri ve Çarpışma Analizi</h1>
      
      <div className="card">
        <h3>Yük Faktörü (Load Factor - α) Analizi</h3>
        <p>Yük faktörü = <code>Dolu Slot (N) / Toplam Kapasite (M)</code>.</p>
        <ul>
          <li><strong>Separate Chaining Performansı:</strong> Bağlı listeler dışarı uzadığı için α &gt; 1 olabilir. Başarısız bir arama (Listeyi sonuna kadar tarama) ortalama <code>α</code> adım sürer. Başarılı bir arama ise ortalama <code>1 + (α / 2)</code> adım sürer. Yani 100 kapasiteli tabloya 500 eleman ekleseniz (α=5), bir elemanı bulmak sadece 3.5 adım sürer!</li>
          <li><strong>Linear Probing Çöküşü:</strong> Tüm veriler dizinin içinde olduğu için α asla 1'i geçemez. Ancak asıl tehlike α = 0.70'i aştığında başlar. Kümelenme (Clustering) yüzünden başarısız arama maliyeti <code>0.5 * (1 + 1 / (1-α)^2)</code> olur. Eğer α=0.9 olursa, boş bir yer bulmak ortalama <strong>50.5 adım</strong> sürer!</li>
        </ul>
      </div>

      <div className="trap-box">
        <h4>Java HashMap Nasıl Çalışır? (Rehashing)</h4>
        <p>Madem Linear Probing (veya herhangi bir kapalı adresleme) doldukça çöküyor, o zaman tablolar nasıl sonsuz eleman alabiliyor? Cevap: <strong>Rehashing (Yeniden Boyutlandırma)</strong>.</p>
        <p>Java'daki standart bir HashMap, <code>Load Factor == 0.75</code> sınırına ulaştığı anda, <strong>kapasitesini 2 katına çıkarır (M * 2)</strong>. Eski tablodaki tüm elemanların <code>hash(k) % (M*2)</code> işlemiyle yepyeni indeksleri hesaplanıp yeni tabloya tek tek taşınır. Bu işlem anlık olarak çok pahalıdır (O(N)), ancak çok nadir yapıldığı için Amortized (Genel Maliyet) olarak yine <code>O(1)</code> sayılır.</p>
      </div>
    </div>
  );
}

export function Section4() {
  return (
    <div className="section active">
      <h1>Bölüm 4: B-Tree ve Disk İndeksleme Mantığı</h1>
      <p>Neden milyarlarca veriyi BST'de değil de B-Tree'de tutarız? Çünkü RAM mikrosaniyelerde çalışırken, Disk milisaniyelerde çalışır. Veritabanında (Oracle, MySQL) arama yaparken diske olabildiğince <strong>az kez dokunmak (I/O Bottleneck)</strong> zorundayız.</p>

      <div className="card">
        <h3>B-Tree'nin Kodsal Anatomisi ve Proactive Splitting</h3>
        <p>B-Tree'de her düğüm (Disk Bloğu), içinde bir sürü eleman barındıran devasa bir dizidir. Bir düğümün alabileceği maksimum eleman sayısı <code>2t-1</code>'dir (t = derece).</p>
        <CodeBlock code={`class BTreeNode {
    int[] keys;      // Düğümün içindeki veriler (Anahtarlar)
    BTreeNode[] children; // Çocuğa giden disk pointer'ları
    int numKeys;     // Şu an içinde kaç eleman var?
    boolean isLeaf;  // En alt katman mı?
    
    // Proactive Splitting (Önceden Bölme) Fonksiyonu İmzası
    void splitChild(int i, BTreeNode y) {
        // y: Kapasitesi tamamen dolmuş (2t-1 elemanlı) olan zavallı çocuk düğüm.
        // i: y'nin ebeveyndeki (parent) indeksi.
        
        BTreeNode z = new BTreeNode(); // y'nin sağ yarısını alacak yeni düğüm
        z.isLeaf = y.isLeaf;
        z.numKeys = t - 1; 

        // y'nin sağındaki elemanları z'ye kopyala...
        // y'nin ORTANCA elemanını Ebeveyn'e (Yukarı) çek...
        // y'nin kapasitesini t-1 olarak güncelle...
    }
}`} />
        <p><strong>Neden Yukarı Çıkarken Bölmüyoruz?</strong> B-Tree'de eleman her zaman en alt kata (yaprağa) eklenir. Eğer eklediğimiz yaprak dolarsa, onu bölüp ortancayı yukarı iteriz. Ya yukarıdaki de doluysa? O da bölünür. Bu zincirleme reaksiyon köke (root) kadar gidebilir. Bu "geri dönüşleri (backtracking)" engellemek için, ekleme algoritması kökten yaprağa inerken, yolda gördüğü <strong>HER DOLU DÜĞÜMÜ</strong> önceden böler (Proactive Splitting). Böylece yaprağa eleman ekleyip yukarı eleman fırlattığımızda, ebeveynin her zaman onu karşılayacak "boş yeri" garantilenmiş olur!</p>
      </div>
    </div>
  );
}

export function Section5() {
  return (
    <div className="section active">
      <h1>Bölüm 5: Graf Teorisi ve Bellek Mimarileri</h1>
      <p>Graflar, dünyadaki ağ yapılarını (Sosyal medya, İnternet, Yollar) temsil eder. Bir grafı bellekte tutmanın iki yolu vardır. İşte kod karşılıkları:</p>

      <div className="card">
        <h3>Adjacency Matrix (Komşuluk Matrisi) - Bellek: O(V²)</h3>
        <p>İki boyutlu (V x V) bir dizi oluşturulur. A ile B arasında yol varsa dizinin `[A][B]` hücresine 1 yazılır.</p>
        <CodeBlock code={`class GraphMatrix {
    int[][] matrix;
    int numVertices;

    public GraphMatrix(int numVertices) {
        this.numVertices = numVertices;
        matrix = new int[numVertices][numVertices]; // Tüm matris 0 ile dolar.
    }

    public void addEdge(int i, int j) {
        matrix[i][j] = 1; // Yönlü ise sadece bu
        matrix[j][i] = 1; // Yönsüz ise her ikisi
    }
}`} />
        <p>Avantajı: İki düğüm arasında bağlantı olup olmadığını <code>O(1)</code>'de bulur. Dezavantajı: Facebook'ta 3 milyar kullanıcı var. 3 Milyar x 3 Milyar boyutunda bir dizi dünyadaki hiçbir RAM'e sığmaz (Sparse Graf problemi).</p>
      </div>

      <div className="card">
        <h3>Adjacency List (Komşuluk Listesi) - Bellek: O(V + E)</h3>
        <p>Her düğüm (Şehir/Kullanıcı), sadece kendine bağlı olan komşularını dinamik bir liste olarak tutar. Hiç bağlantısı olmayanın listesi boştur.</p>
        <CodeBlock code={`class GraphList {
    int numVertices;
    LinkedList<Integer>[] adjList; // Her elemanı LinkedList olan bir Array

    public GraphList(int numVertices) {
        this.numVertices = numVertices;
        adjList = new LinkedList[numVertices];
        for(int i = 0; i < numVertices; i++) {
            adjList[i] = new LinkedList<>();
        }
    }

    public void addEdge(int src, int dest) {
        adjList[src].add(dest); // src listesinin sonuna dest ekle
    }
}`} />
        <p>Büyük ve seyrek (Sparse) ağların tamamında Adjacency List kullanılır. Sınavlardaki DFS/BFS analizlerinin hepsi Liste kullanıldığı varsayılarak <code>O(V + E)</code> üzerinden çözülür.</p>
      </div>
    </div>
  );
}

export function Section6() {
  return (
    <div className="section active">
      <h1>Bölüm 6: Graflarda Gezinme: DFS ve BFS Kodları</h1>
      
      <div className="card">
        <h3>DFS (Derinliğine Arama) Kod Analizi</h3>
        <p>Labirente dalma mantığıdır. En uca kadar gider, çıkmaza girince geri döner. Stack bellek kullanır (Burada Recursive kullanarak işletim sisteminin Call Stack'ini sömürüyoruz).</p>
        <CodeBlock code={`public void DFS(int v, boolean[] visited) {
    // Bulunduğumuz düğümü 'Ziyaret Edildi' olarak işaretle
    visited[v] = true;
    System.out.print(v + " ");

    // Benim listemdeki TÜM komşulara bak
    for (int neighbor : adjList[v]) {
        // Eğer komşuya daha önce gitmediysek, ONUN İÇİNE DAL (Recursive)
        if (!visited[neighbor]) {
            DFS(neighbor, visited); 
        }
    }
}`} />
        <p><strong>Uygulama Alanı:</strong> Topolojik Sıralama, Döngü (Cycle) Tespiti ve Labirent çözümleri.</p>
      </div>

      <div className="card">
        <h3>BFS (Genişliğine Arama) Kod Analizi</h3>
        <p>Suya atılan taş dalgasıdır. Önce 1 birim uzağa, sonra 2 birim uzağa gider. FIFO mantıklı bir <strong>Kuyruk (Queue)</strong> kullanır. <strong>En Kısa Yolu</strong> garanti eden yegane gezinme şeklidir.</p>
        <CodeBlock code={`public void BFS(int startVertex) {
    boolean[] visited = new boolean[numVertices];
    Queue<Integer> queue = new LinkedList<>();

    // Başlangıç noktasını kuyruğa at ve işaretle
    visited[startVertex] = true;
    queue.add(startVertex);

    while (!queue.isEmpty()) {
        int current = queue.poll(); // Kuyruğun EN BAŞINDAKİNİ al
        System.out.print(current + " ");

        // Çıkardığın düğümün tüm komşularını KUYRUĞUN SONUNA ekle
        for (int neighbor : adjList[current]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true; // Kuyruğa atarken işaretle ki başkası atmasın
                queue.add(neighbor);
            }
        }
    }
}`} />
        <p><strong>Sınav Tuzağı:</strong> <code>visited[neighbor] = true</code> işlemini düğümü kuyruktan çıkardıktan sonra DEĞİL, kuyruğa atarken (yukarıdaki kodda olduğu gibi) yapmalısınız. Aksi takdirde, iki farklı düğüm aynı komşuyu tekrar tekrar kuyruğa atar ve sonsuz döngü tehlikesi doğar!</p>
      </div>
    </div>
  );
}

export function Section7() {
  return (
    <div className="section active">
      <h1>Bölüm 7: MST (Minimum Spanning Tree) - Prim ve Kruskal</h1>
      <p>Bir haritadaki tüm şehirleri <strong>en az maliyetle</strong> birbirine bağlama (Örn: Fiber optik çekme) sanatıdır. İki meşhur açgözlü (Greedy) algoritma vardır.</p>

      <div className="card">
        <h3>Kruskal Algoritması ve Disjoint Set (Union-Find)</h3>
        <p>Kruskal haritaya bütün olarak bakar. En ucuz yolu alır. Ancak bu yolu haritaya çizerken bir <strong>DÖNGÜ (Cycle)</strong> oluşup oluşmayacağını bilmesi gerekir. Bunun için <strong>Union-Find</strong> veri yapısını ve sihirli "Yol Sıkıştırma (Path Compression)" algoritmasını kullanır.</p>
        <CodeBlock code={`class DisjointSet {
    int[] parent;

    public DisjointSet(int n) {
        parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i; // Başlangıçta herkes kendi kendinin atasıdır
    }

    // PATH COMPRESSION (Yol Sıkıştırma) MUCİZESİ
    public int find(int i) {
        if (parent[i] == i) {
            return i; // En tepeye (Root) ulaştık
        }
        // Özyineli olarak yukarı çıkarken, yoldaki tüm elemanları DOĞRUDAN Root'a bağla!
        parent[i] = find(parent[i]); 
        return parent[i];
    }

    public void union(int i, int j) {
        int rootI = find(i);
        int rootJ = find(j);
        if (rootI != rootJ) {
            parent[rootI] = rootJ; // Bir ağacı diğerinin altına bağla
        }
    }
}

// Kruskal İçinde Kullanımı:
if (find(sehirA) != find(sehirB)) {
    // Ataları farklı, yani döngü yok!
    union(sehirA, sehirB);
    mstListesineEkle(yol);
}`} />
        <p>Path Compression olmasaydı arama maliyeti <code>O(V)</code> olacaktı. Ancak bu tek satırlık kod, ağacı düzleştirerek arama maliyetini <code>O(α(V))</code> (Pratikte <code>O(1)</code>) seviyesine indirir. Kruskal'ın asıl zamanını alan şey yolları sıralamak olduğu için genel maliyet <code>O(E log E)</code> olur.</p>
      </div>

      <div className="card">
        <h3>Prim Algoritması</h3>
        <p>Kruskal gibi tüm yolları sıralamak yerine (ki bu çok yol olan Dense graflarda felakettir), Prim algoritması tıpkı Dijkstra gibi bir noktadan başlar ve <strong>Priority Queue (Min-Heap)</strong> kullanarak, kendi fethettiği bölgelerden dışarı uzanan en ucuz dalı seçerek büyür.</p>
        <p>Eğer graf "Dense (Çok yoğun)" ise yani çok fazla kenar varsa, Prim algoritması Kruskal'ı ezer geçer. Çünkü Prim'de kenarları baştan sıralamaya gerek yoktur, maliyet <code>O(E log V)</code> olur.</p>
      </div>
    </div>
  );
}
