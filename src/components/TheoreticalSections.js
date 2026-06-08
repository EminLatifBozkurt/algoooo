import React from "react";

export function Section1() {
  return (
    <div className="section active">
      <h1>Bölüm 1: Algoritma Karmaşıklığı ve İkili Arama Ağaçları (BST)</h1>
      <p>Bir veri yapısının gücü, veriyi saklama kapasitesiyle değil, milyonlarca kayıt arasından aradığınızı ne kadar hızlı bulabildiğiyle ölçülür.</p>
      
      <div className="card">
        <h3>Asimptotik Notasyonlar ve Arama Mantığı</h3>
        <p>Bir BST'de arama yaparken her adımda köke bakıp "Aradığım sayı bundan küçük mü, büyük mü?" deriz. Küçükse sola, büyükse sağa gideriz. Bu yapı asimptotik notasyonlarla analiz edilir:</p>
        <ul>
          <li><strong>En Kötü Durum (Worst Case):</strong> Sayılar sürekli artan veya azalan şekilde gelmişse (1, 2, 3...), ağaç düz bir çizgi (bağlı liste) olur. Süre: <code>O(n)</code>. Denklem: <code>T(n) = T(n-1) + c</code></li>
          <li><strong>En İyi/Ortalama Durum:</strong> Ağaç dengeliyse (örn. AVL veya Kırmızı-Siyah ağacı gibi), her adımda seçenekleri yarıya indiririz. Süre: <code>O(log n)</code>. Denklem: <code>T(n) = T(n/2) + c</code> (Master Theorem Case 2'ye göre).</li>
        </ul>
        <div style={{ padding: "10px", backgroundColor: "rgba(0,255,100,0.1)", borderLeft: "4px solid var(--success)", marginTop: "10px" }}>
          <strong>🌍 Gerçek Dünya Örneği: 3D Oyun Motorları (BSP Trees)</strong><br/>
          Doom veya Quake gibi efsanevi oyunların motorları ekrana hangi duvarın çizileceğini bulmak için İkili Uzay Bölümleme (Binary Space Partitioning) ağaçları kullanır. Oyuncunun konumuna göre ağacın sağına veya soluna inilerek, oyuncunun arkasında kalan devasa harita bölümleri <code>O(log n)</code> sürede elenir ve sadece görünen yerler RAM'e yüklenir.
        </div>
      </div>

      <div className="card">
        <h3>Düğüm Silme (Deletion) Senaryoları</h3>
        <p>Ağaçtan düğüm silmek, eklemekten çok daha karmaşıktır. Adım adım senaryolar:</p>
        <ol>
          <li><strong>Yaprak Düğüm (Leaf Node) Silme:</strong> En basiti. Düğümün hiçbir çocuğu yoktur. Direkt ebeveynin göstericisi (pointer) <code>null</code> yapılarak bellekten düşürülür.</li>
          <li><strong>Tek Çocuklu Düğüm Silme:</strong> Silinecek düğümün yeri, tek çocuğuna devredilir. (Bir nevi büyükanne ile torunu doğrudan bağlayıp, aradaki babayı listeden çıkarmak gibidir).</li>
          <li><strong>İki Çocuklu Düğüm Silme:</strong> En tehlikeli işlemdir. Düğüm direkt silinmez. Bunun yerine sağ alt ağaca gidilir, oradaki <strong>en küçük eleman (Inorder Successor)</strong> bulunur. Bu elemanın değeri, silinmek istenen düğüme kopyalanır. Sonra asıl successor (ki o ya yapraktır ya da tek çocukludur) 1 veya 2 numaralı kurala göre silinir.</li>
        </ol>
      </div>

      <div className="trap-box">
        <h4>Sınav Tuzağı: İteratif Ekleme ve Bellek Yönetimi</h4>
        <p>Özyineli (recursive) fonksiyonlar belleği şişirir (Call Stack). Bu yüzden profesyonel sistemlerde while döngüsü ile ağacın dibine kadar (null bulana kadar) ineriz.</p>
        <pre>
{`Node current = root;
Node parent = null;
while(current != null) {
    parent = current; // BİR NUMARALI TUZAK!
    if(val < current.val) current = current.left;
    else current = current.right;
}`}
        </pre>
        <p><strong>Soru:</strong> Koddaki <code>parent = current;</code> satırını silersek ne olur?<br/>
        <strong>Cevap:</strong> Döngü <code>current = null</code> olduğunda durur. Bulduğumuz o boşluğa (uçuruma) yeni düğümü eklememiz lazım ama nerede olduğumuzu unutursak (önceki dalı tutmazsak) ekleyemeyiz. <code>parent</code> değişkeni bizi uçuruma düşmekten kurtaran son halattır.</p>
      </div>

      <div className="card">
        <h3>Ağaçlarda Gezinme (Traversals)</h3>
        <ul>
          <li><strong>Inorder (Sol-Kök-Sağ):</strong> Sayıları küçükten büyüğe sıralı verir. Testlerin vazgeçilmezidir.</li>
          <li><strong>Preorder (Kök-Sol-Sağ):</strong> Ağacın birebir kopyasını oluşturmak (Klonlama) veya ifade ağaçlarında prefix notasyonu için kullanılır.</li>
          <li><strong>Postorder (Sol-Sağ-Kök):</strong> Ağacı bellekten silmek (Garbage Collection) için kullanılır (Kural: Önce çocukları sil, sonra babayı sil).</li>
          <li><strong>Level Order:</strong> Kuyruk (Queue) kullanarak BFS mantığıyla katman katman gezer.</li>
        </ul>
      </div>
    </div>
  );
}

export function Section2() {
  return (
    <div className="section active">
      <h1>Bölüm 2: Hashing ve Mimari Çözümler</h1>
      <p>Arama işlemini <code>O(log n)</code>'den <code>O(1)</code>'e yani "Anında Bulma" seviyesine çıkaran mucizevi veri yapısıdır.</p>
      
      <div className="card">
        <h3>Hash Fonksiyonları ve Mod Alma Sanatı</h3>
        <ul>
          <li><strong>Bölme Yöntemi (Division Method):</strong> <code>h(k) = k mod M</code>. M (Tablo boyutu) asal sayı seçilmelidir. Eğer M sayısı 2'nin bir kuvveti (örn 1024) seçilirse, sayının sadece son 10 bitine bakılmış olur, bu da devasa veri kümelerinde korkunç çarpışmalara yol açar.</li>
          <li><strong>Çarpma Yöntemi:</strong> <code>h(k) = floor(M * (k * A mod 1))</code>. Burada A genellikle Altın Oran'dır (0.618033...). Tablo boyutundan bağımsız olarak çok daha homojen bir dağılım sunar.</li>
        </ul>
      </div>

      <div className="trap-box">
        <h4>Gerçek Dünya Hack'i: Bitwise AND ile Negatif İndeks Koruması</h4>
        <pre>{`int index = (key.hashCode() & 0x7fffffff) % tableSize;`}</pre>
        <p>Java'da <code>hashCode()</code> negatif sayı üretebilir. Negatif bir sayının modu da negatiftir ve dizi (Array) indeksine negatif vermek programı anında çökertir (ArrayIndexOutOfBounds). <code>& 0x7fffffff</code> işlemi sayının en baştaki "işaret bitini" 0 yaparak sayıyı maskeler ve pozitif kalmasını garanti eder. Neden <code>Math.abs()</code> kullanılmaz? Çünkü <code>Math.abs(Integer.MIN_VALUE)</code> taşma (overflow) yapar ve hala negatif döner!</p>
      </div>

      <div className="card">
        <h3>Separate Chaining (Ayrı Zincirleme)</h3>
        <p>Aynı indekse birden fazla veri gelirse (Çarpışma), o yuvaya dışarıdan bir bağlı liste takılır. Veriler uç uca o listede biriktirilir.</p>
        <div style={{ padding: "10px", backgroundColor: "rgba(0,255,100,0.1)", borderLeft: "4px solid var(--success)", marginTop: "10px" }}>
          <strong>🌍 Gerçek Dünya Örneği: DNS ve Caching Sistemleri (Redis/Memcached)</strong><br/>
          DNS sunucuları bir IP adresini anında bulmak için Separate Chaining temelli devasa Hash Tabloları kullanır. Yük faktörü çok yüksek olsa bile verilerin asla kaybolmaması gereken (fakat bağlı liste uzadıkça hafif yavaşlayabilen) RAM tabanlı sistemlerde en güvenilir yöntemdir.
        </div>
      </div>

      <div className="card">
        <h3>Closed Hashing (Açık Adresleme)</h3>
        <p>Bağlı liste yok! Tüm veriler ana dizidedir. Slot doluysa kurala göre boş bir yer aranır:</p>
        <ul>
          <li><strong>Linear Probing (Doğrusal):</strong> <code>h(k, i) = (h'(k) + i) mod M</code>. Bir sonraki slota bakar. <em>Birincil Kümelenme (Primary Clustering)</em> yaratır; dolu slotlar yanyana yapışarak büyük duvarlar oluşturur.</li>
          <li><strong>Quadratic Probing (Karesel):</strong> <code>+1, +4, +9...</code> adım atlar. Aynı hash değerine sahip olanlar aynı atlama izini takip ettiği için <em>İkincil Kümelenme (Secondary Clustering)</em> yaratır.</li>
          <li><strong>Double Hashing (Çift Hash):</strong> <code>h(k, i) = (h1(k) + i * h2(k)) mod M</code>. İki farklı hash fonksiyonu kullanılır. Her verinin atlama adımı (step size) kendisine özgüdür. Kümelenmeyi tamamen çözer ama CPU maliyeti yüksektir.</li>
        </ul>
      </div>
      
      <div className="trap-box">
        <h4>Mezar Taşı (Tombstone) Mimarisi</h4>
        <p>Linear Probing'de arama işlemi boş bir slot görene kadar devam eder. Eğer bir elemanı silip yerine <code>null</code> koyarsanız, o elemandan sonra eklenmiş (ama çarpışma yüzünden ileri kaymış) verilerin arama zincirini koparırsınız. Çözüm: <code>deleted = true</code> (Tombstone) bayrağı bırakmaktır. Arama algoritması bu mezar taşını görünce "buradan biri silinmiş, aramaya devam et" der.</p>
      </div>
    </div>
  );
}

export function Section3() {
  return (
    <div className="section active">
      <h1>Bölüm 3: Hashing İstatistikleri ve Yük Faktörü</h1>
      <p><strong>Yük Faktörü (Load Factor - α) = Dolu Eleman (N) / Tablo Boyutu (M)</strong>. Sistemin performansını belirleyen yegane metriktir.</p>

      <div className="card">
        <h3>Poisson Dağılımı Gerçeği</h3>
        <p>1000 kapasiteli bir tabloya tamamen rastgele 1000 eleman (α=1) eklerseniz, her eleman kendi slotuna mükemmel şekilde oturmaz. Olasılık bilimi (Poisson Dağılımı) devreye girer:</p>
        <ul>
          <li>Bir slotun <strong>tamamen boş kalma ihtimali</strong>: <code>e^(-α)</code>. (α=1 için %36.8)</li>
          <li>Yani 1000 eleman eklediğinizde, tablonun 368 yuvası tamamen boştur! Kalan 632 yuvaya ise 1000 eleman sıkışmaya çalışır (Çarpışma garantisi).</li>
        </ul>
      </div>

      <div className="card">
        <h3>Arama Maliyetlerinin İspatı</h3>
        <p><strong>Separate Chaining (Ayrı Zincirleme):</strong> α=5 bile olsa (tablo boyutunun 5 katı eleman), başarısız arama sadece listeyi taramak kadar (ortalama 5 adım), başarılı arama ise ortalama <code>1 + (α/2) = 3.5</code> adım sürer. Mükemmel bir dirence sahiptir.</p>
        <p><strong>Linear Probing Çöküşü:</strong> Linear probing'de başarısız arama maliyeti <code>≈ 0.5 * (1 + 1 / (1-α)^2)</code> formülüyle artar. Tablo %90 doluluğa (α=0.9) ulaştığında, boş bir yer bulmak veya bir verinin olmadığını anlamak ortalama <strong>50.5 adım</strong> sürer! Bu yüzden Java'nın <code>HashMap</code> sınıfı, yük faktörü %75'e ulaştığı an (α=0.75) tabloyu anında iki katı boyutta yeni bir diziye kopyalar (Rehashing).</p>
      </div>
    </div>
  );
}

export function Section4() {
  return (
    <div className="section active">
      <h1>Bölüm 4: B-Tree ve Veritabanı İndekslemesi</h1>
      <p>Bilgisayarın RAM okuma hızı nanosaniyeler, Sabit Disk (HDD/SSD) okuma hızı milisaniyelerdir (Yüzbinlerce kat daha yavaş). Bir ikili ağaç 1 milyon veride 20 katman derinliğe ulaşır ve diskten 20 parça veri okuması gerekir. Bu korkunç bir darboğazdır (I/O Bottleneck).</p>

      <div className="card">
        <h3>B-Tree Çözümü: Kısa ve Geniş Ağaçlar</h3>
        <p>B-Tree, bir disk bloğuna (örn. 8 KB) yüzlerce anahtar sığdırarak ağacı yatayda genişletir. 100 milyon kayıtlık bir veritabanında bile ağacın derinliği sadece 3 veya 4 seviyede kalır. Yani diske sadece 3 kez dokunarak aradığınız kaydı bulursunuz.</p>
        <div style={{ padding: "10px", backgroundColor: "rgba(0,255,100,0.1)", borderLeft: "4px solid var(--success)", marginTop: "10px" }}>
          <strong>🌍 Gerçek Dünya Örneği: PostgreSQL ve MySQL (B+ Tree)</strong><br/>
          Bugün kullandığınız neredeyse tüm ilişkisel veritabanları <strong>B+ Tree</strong> kullanır. Klasik B-Tree'den farkı şudur: Bütün gerçek veriler SADECE en alt kattaki yapraklarda (leaf) tutulur ve bu yapraklar birbirine bağlı liste (linked list) ile bağlanır. Siz "Maaşı 5000'den büyük olanları getir" (Range Query) dediğinizde, veritabanı 5000'i bulur ve ağacın yukarısına hiç çıkmadan bağlı listede yatay olarak kayarak tüm sonuçları saliseler içinde listeler.
        </div>
      </div>

      <div className="card">
        <h3>Kurallar ve "Proactive Splitting" (Önceden Bölme)</h3>
        <ul>
          <li><strong>Kapasite:</strong> Bir düğüm en fazla <code>2t-1</code> anahtar tutabilir.</li>
          <li><strong>Ekleme:</strong> Her zaman yapraklara yapılır. Ancak, yukarıdan aşağı inerken kapasitesi tamamen dolmuş (2t-1) bir düğüm görürsek ne olur? Geri dönmek disk okuması açısından pahalı olduğu için algoritma o düğümü <strong>hemen ikiye böler (split)</strong> ve ortanca elemanı babasına atar. Buna Proactive Splitting denir.</li>
        </ul>
      </div>
    </div>
  );
}

export function Section5() {
  return (
    <div className="section active">
      <h1>Bölüm 5: Graf Teorisi Temelleri</h1>
      <p>Gerçek dünyadaki bağlantılı sistemleri (İnternet, Karayolları, Sosyal Medya) modellemenin matematiksel yoludur. Düğümler (Vertex/Node) ve Kenarlardan (Edge) oluşur.</p>

      <div className="card">
        <h3>Bellek Mimarisi (Representation)</h3>
        <ul>
          <li><strong>Komşuluk Matrisi (Adjacency Matrix):</strong> V x V boyutunda 2D dizidir. Bellek maliyeti <code>O(V^2)</code>'dir. İstanbul'un tüm kavşaklarını matrisle tutarsanız matrisin %99.9'u sıfır (boş) olur, devasa bellek israfıdır. Ancak iki düğüm arasında bağlantı var mı sorusuna <code>O(1)</code>'de cevap verir.</li>
          <li><strong>Komşuluk Listesi (Adjacency List):</strong> Her düğüm için sadece bağlı olduğu komşuları liste halinde tutar. Bellek maliyeti sadece <code>O(V + E)</code>'dir. Günümüzdeki devasa ve seyrek (Sparse) ağların (Örn: Facebook arkadaşlık ağı) tamamında List yapısı kullanılır.</li>
        </ul>
      </div>

      <div className="trap-box">
        <h4>Euler ve Hamilton Arasındaki İnce Çizgi</h4>
        <ul>
          <li><strong>Euler Döngüsü:</strong> Bir haritadaki bütün <strong>YOLLARI (Kenarları)</strong> tam 1 kez geçerek başa dönmektir. Şartı basittir: Tüm şehirlerin yol (derece) sayısı ÇİFT sayı olmalıdır. (Çöp kamyonu rota planlaması).</li>
          <li><strong>Hamilton Döngüsü:</strong> Bütün <strong>ŞEHİRLERİ (Düğümleri)</strong> tam 1 kez ziyaret etmektir. Çözümü için bilinen hızlı bir algoritma yoktur (NP-Complete'tir). Amazon kargocusunun en kısa rotayı bulma problemi buna örnektir (Gezgin Satıcı Problemi).</li>
        </ul>
      </div>
    </div>
  );
}

export function Section6() {
  return (
    <div className="section active">
      <h1>Bölüm 6: Graflarda Gezinme (DFS ve BFS)</h1>

      <div className="card">
        <h3>Derinliğine Arama (DFS) ve Yığıt (Stack)</h3>
        <p>Mantığı labirente dalmaktır. Gidebildiği yere kadar gider, çıkmaza girince geri döner (Backtracking). Bellek olarak Call Stack veya manuel Yığıt (LIFO) kullanır.</p>
        <div style={{ padding: "10px", backgroundColor: "rgba(0,255,100,0.1)", borderLeft: "4px solid var(--success)", marginTop: "10px" }}>
          <strong>🌍 Gerçek Dünya Örneği: Üniversite Önkoşulları (Topolojik Sıralama)</strong><br/>
          Hangi dersi almadan diğerine geçemeyeceğinizi hesaplayan Topolojik Sıralama algoritması doğrudan DFS'e dayanır. DFS, bağımlılık ağacının en dibine (hiç önkoşulu olmayan derse) ulaşır ve geri çıkarken dersleri yığıta ekleyerek size mükemmel bir müfredat sıralaması verir.
        </div>
      </div>

      <div className="card">
        <h3>Genişliğine Arama (BFS) ve Kuyruk (Queue)</h3>
        <p>Suya atılan taşın dalgaları gibi çalışır. Önce merkezdeki düğüme 1 birim uzaklıktakiler, sonra 2 birim uzaklıktakiler taranır. Kuyruk (FIFO) veri yapısını şart koşar.</p>
        <div style={{ padding: "10px", backgroundColor: "rgba(0,255,100,0.1)", borderLeft: "4px solid var(--success)", marginTop: "10px" }}>
          <strong>🌍 Gerçek Dünya Örneği: En Kısa Yol ve Öneri Sistemleri</strong><br/>
          Ağırlıksız bir grafta (her yolun eşit uzunlukta olduğu) <strong>En Kısa Yolu</strong> garanti eden tek algoritma BFS'dir. Ayrıca LinkedIn veya Facebook'taki "Sana 2. derece uzaklıkta (Ortak arkadaş üzerinden)" öneri sistemleri tamamen BFS kullanılarak, merkezinizden dalga dalga yayılan ağ analizleriyle hesaplanır.
        </div>
      </div>
    </div>
  );
}

export function Section7() {
  return (
    <div className="section active">
      <h1>Bölüm 7: MST (Minimum Kapsayan Ağaç) ve Kruskal</h1>
      <p>Graftaki tüm düğümleri, toplam maliyeti en az (en ucuz) olacak şekilde birbirine bağlayan "döngüsüz" alt ağaçtır.</p>

      <div className="card">
        <h3>Prim ve Kruskal: Düello</h3>
        <ul>
          <li><strong>Prim Algoritması:</strong> Bir başlangıç düğümü seçer ve kendi bağlı olduğu yolların en ucuzunu alarak büyür (Dijkstra gibi Priority Queue kullanır). Çok fazla yolun olduğu (Dense) graflarda çok hızlıdır.</li>
          <li><strong>Kruskal Algoritması:</strong> Açgözlüdür (Greedy). Haritaya bakmaz, tüm yolları ucuzdan pahalıya sıralar. Sırayla en ucuzları alır. Sadece alınan yol bir "döngü (cycle)" yaratıyorsa o yolu atlar. Az yolun olduğu (Sparse) ağlarda rakipsizdir.</li>
        </ul>
        <div style={{ padding: "10px", backgroundColor: "rgba(0,255,100,0.1)", borderLeft: "4px solid var(--success)", marginTop: "10px" }}>
          <strong>🌍 Gerçek Dünya Örneği: Fiber Optik Altyapısı</strong><br/>
          Bir telekomünikasyon şirketi, bir mahalledeki tüm binalara fiber internet bağlamak istiyor. Ancak kazı maliyetini minimumda tutmak istiyor. Şirketin kullanacağı algoritma net bir şekilde Kruskal veya Prim'dir. Döngü istenmez, çünkü her binaya tek bir hattan sinyal ulaşması yeterlidir.
        </div>
      </div>

      <div className="trap-box">
        <h4>Disjoint Set (Union-Find) ve Yol Sıkıştırma (Path Compression)</h4>
        <p>Kruskal'ın döngü yaratıp yaratmadığını anlaması gerekir. Bunun için <code>find(x)</code> fonksiyonu kullanılır. Eğer A şehrinin bağlı olduğu en büyük ata (root) ile B şehrinin atası aynıysa, bu iki şehri birleştirmek döngü yaratır.</p>
        <p><strong>Yol Sıkıştırma:</strong> Kod içindeki <code>parent[i] = find(parent[i])</code> satırı sihirli bir optimizasyondur. Arama yaparken geçilen tüm ara düğümleri, doğrudan en tepedeki köke bağlar. Böylece ağaç düzleşir. Union by Rank (Kısa ağacı uzunun köküne bağlama) ile birleştiğinde, arama maliyeti inanılmaz bir şekilde <strong>Ters Ackermann Fonksiyonuna <code>O(α(V))</code></strong> iner, ki bu pratikte <code>O(1)</code> yani anında cevap anlamına gelir.</p>
      </div>
    </div>
  );
}
